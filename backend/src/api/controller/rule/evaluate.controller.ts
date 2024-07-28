import { Request, Response } from 'express';
import { RuleService } from '../../service/rule/rule.service';
import { IRuleService } from '../../interfaces/rule.interface';
import { ResponseFormatter } from '../../../lib/response-formatter';
import { ASTParser } from '../../../lib/utils';

const ruleService: IRuleService = new RuleService();

export const evaluateRule = async (req: Request, res: Response) => {

  console.log(req.body);
  const { rule, data } = req.body;
  const ast = ASTParser.parse(rule);

  try {
    const result = ruleService.evaluateRule(ast, data);
    return ResponseFormatter.success(res, "Rule evaluated successfully", { passed : result });
  } catch (error) {
    return ResponseFormatter.error(res, 500, error.message);
  }
};