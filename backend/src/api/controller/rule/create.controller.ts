import { Request, Response } from 'express';
import { RuleService } from '../../service/rule/rule.service';
import { IRuleService } from '../../interfaces/rule.interface';
import { ResponseFormatter } from '../../../lib/response-formatter';

const ruleService: IRuleService = new RuleService();

export const createRule = async (req: Request, res: Response) => {
  const { ruleString } = req.body;

  try {
    const rule = await ruleService.createRule(ruleString);
    return ResponseFormatter.success(res, "Rule created successfully", rule);
  } catch (error) {
    return ResponseFormatter.error(res, 500, error.message);
  }
};