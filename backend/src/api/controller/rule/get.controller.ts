import { Request, Response } from 'express';
import { RuleService } from '../../service/rule/rule.service';
import { IRuleService } from '../../interfaces/rule.interface';
import { ResponseFormatter } from '../../../lib/response-formatter';
import { ASTParser } from '../../../lib/utils';

const ruleService: IRuleService = new RuleService();

export const getRules = async (req: Request, res: Response) => {
  try {
    const rules = await ruleService.getRules();
    return ResponseFormatter.success(res, "Rules fetched successfully", { rules });
  } catch (error) {
    console.log(error)
    return ResponseFormatter.error(res, 500, error.message);
  }
};