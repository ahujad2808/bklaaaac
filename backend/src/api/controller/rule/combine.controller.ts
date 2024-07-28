import { Request, Response } from 'express';
import { RuleService } from '../../service/rule/rule.service';
import { IRuleService } from '../../interfaces/rule.interface';
import { ResponseFormatter } from '../../../lib/response-formatter';

const ruleService: IRuleService = new RuleService();

export const combineRules = async (req: Request, res: Response) => {
  const { rules } = req.body;

  try {
    const combinedAst = await ruleService.combineRules(rules);
    return ResponseFormatter.success(res, "Rules combined successfully", combinedAst);
  } catch (error) {
    return ResponseFormatter.error(res, 500, error.message);
  }
};