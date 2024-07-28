export class Node {
  type: 'operator' | 'operand';
  left?: Node;
  right?: Node;
  value?: any;

  constructor(type: 'operator' | 'operand', left?: Node, right?: Node, value?: any) {
    this.type = type;
    this.left = left;
    this.right = right;
    this.value = value;
  }
}


export class ASTParser {
  static parse(ruleString: string): Node {
    const tokens = this.tokenize(ruleString);
    const { node, remainingTokens } = this.parseExpression(tokens);
    if (remainingTokens.length > 0) {
      throw new Error('Unexpected tokens after parsing');
    }

    return node;
  }

  static combine(ruleStrings: string[]): Node {
    if (ruleStrings.length === 0) {
      throw new Error('No rules provided');
    }
    
    const asts = ruleStrings.map(rule => this.parse(rule));
    const operatorCounts = this.countOperators(asts);

    const primaryOperator = operatorCounts.AND > operatorCounts.OR ? 'AND' : 'OR';
    return this.combineASTs(asts, primaryOperator);
  }

  public static countOperators(asts: Node[]): { AND: number, OR: number } {
    const counts = { AND: 0, OR: 0 };

    function countOperatorsInNode(node: Node) {
      if (node.type === 'operator') {
        //@ts-ignore
        counts[node.value]++;
        if (node.left) countOperatorsInNode(node.left);
        if (node.right) countOperatorsInNode(node.right);
      }
    }

    asts.forEach(ast => countOperatorsInNode(ast));
    return counts;
  }

  public static combineASTs(asts: Node[], operator: 'AND' | 'OR'): Node {
    if (asts.length === 1) {
      return asts[0];
    }

    // Combine all ASTs using the given operator
    let combinedAST = asts[0];
    for (let i = 1; i < asts.length; i++) {
      combinedAST = new Node('operator', combinedAST, asts[i], operator);
    }
    return combinedAST;
  }

  private static tokenize(input: string): string[] {
    const tokens: string[] = [];
    let current = '';
    let inQuotes = false;

    for (const char of input) {
        if (char === ' ' && !inQuotes) {
        if (current) {
            tokens.push(current.trim());
            current = '';
        }
        } else if (char === '(' || char === ')') {
            if (current) {
                tokens.push(current.trim());
                current = '';
            }
            tokens.push(char);
        } else if (char === '\'' || char === '"') {
            inQuotes = !inQuotes;
            current += char;
        } else {
            current += char;
        }
    }

    if (current) {
        tokens.push(current.trim());
    }

    return tokens;
  }

  private static parseExpression(tokens: string[]): { node: Node, remainingTokens: string[] } {
    let node = this.parseLogical(tokens);
    return { node, remainingTokens: tokens };
  }

  private static parseLogical(tokens: string[]): Node {
    let node = this.parseComparison(tokens);
    let token = tokens[0];

    while (token === 'AND' || token === 'OR') {
      tokens.shift();
      const rightNode = this.parseComparison(tokens);
      node = new Node('operator', node, rightNode, token);
      token = tokens[0];
    }

    return node;
  }

  private static parseComparison(tokens: string[]): Node {
    let token = tokens.shift();

    if (token === '(') {
      const { node, remainingTokens } = this.parseExpression(tokens);
      if (remainingTokens.shift() !== ')') {
        throw new Error('Mismatched parentheses');
      }
      return node;
    }
    const key = token;
    const operator = tokens.shift();
    let value = tokens.shift();

    if (value?.startsWith("'") || value?.startsWith('"')) {
      value = value.replace(/^['"]|['"]$/g, '');
    }

    if (!key || !operator || value === undefined) {
      throw new Error('Invalid operand format');
    }

    if (['AND', 'OR'].includes(value)) {
      tokens.unshift(value); 
      value = undefined;
    }

    const node = new Node('operand', undefined, undefined, {
      key,
      operator,
      value
    });
    return node;
  }
}
