import { Rule } from "../models/rule.model";
import { Node } from "../../lib/utils";

export interface IRuleService {
  getRules(): Promise<Rule[]>;
  createRule(ruleString: string): Promise<Rule>;
  combineRules(rules: string[]): Promise<Rule>;
  evaluateRule(ast: Node, data: any): boolean;
}


export interface IRuleRepository {
  create(rule: string, title: string): Promise<Rule>;
  getById(id: string): Promise<Rule | null>;
  getAll(): Promise<Rule[]>;
}