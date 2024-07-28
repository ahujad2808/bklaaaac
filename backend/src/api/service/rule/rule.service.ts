import { RuleRepository } from '../../repositories/rule.repository';
import { Node, ASTParser } from '../../../lib/utils';
import { Rule } from '../../models/rule.model';
import { IRuleService } from '../../interfaces/rule.interface';

export class RuleService implements IRuleService {
    private ruleRepository: RuleRepository;

    constructor() {
        this.ruleRepository = new RuleRepository();
    }

    async getRules(): Promise<Rule[]> {
        return await this.ruleRepository.getAll();
    }

    async createRule(ruleString: string, ): Promise<Rule> {
        const ast: Node = ASTParser.parse(ruleString);
        const title = ruleString;
        return this.ruleRepository.create(JSON.stringify(ast), ruleString);
    }

    async combineRules(rules: string[]): Promise<Rule> {
        const asts = rules.map(ruleString => ASTParser.parse(ruleString));
        const titleString = rules.join(' AND ');
        const operatorCounts = ASTParser.countOperators(asts);
        const primaryOperator = "AND"
        const combinedAST = ASTParser.combineASTs(asts, primaryOperator);
        const combinedRule = await this.ruleRepository.create(JSON.stringify(combinedAST), titleString);
        return combinedRule;
    }

    evaluateRule(ast: Node, data: any): boolean {
        return this.evaluateAST(ast, data);
    }

    private evaluateAST(node: Node, data: any): boolean {
    if (!node) {
      throw new Error('Invalid AST node');
    }

    if (node.type === 'operand') {
      const { key, operator, value } = node.value;
      const dataValue = data[key];

      if (dataValue === undefined) {
        throw new Error(`Data key '${key}' is missing`);
      }

      const numericValue = parseFloat(value);

      switch (operator) {
        case '>':
          return dataValue > numericValue;
        case '<':
          return dataValue < numericValue;
        case '>=':
          return dataValue >= numericValue;
        case '<=':
          return dataValue <= numericValue;
        case '=':
          return dataValue == value;
        case '!=':
          return dataValue != value;
        default:
          throw new Error(`Unknown operator '${operator}'`);
      }
    }

    // Handle operator nodes (AND, OR)
    if (node.type === 'operator') {
      if (!node.left || !node.right) {
        throw new Error('Invalid operator node with missing children');
      }

      const leftResult = this.evaluateAST(node.left, data);
      const rightResult = this.evaluateAST(node.right, data);

      switch (node.value) {
        case 'AND':
          return leftResult && rightResult;
        case 'OR':
          return leftResult || rightResult;
        default:
          throw new Error(`Unknown logical operator '${node.value}'`);
      }
    }

    throw new Error('Invalid node type');
  }
}
