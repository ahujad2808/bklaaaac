import { PrismaClient } from '@prisma/client';
import { Rule } from '../models/rule.model';
import { IRuleRepository } from '../interfaces/rule.interface';
import { prisma } from "../../lib/prisma"

export class RuleRepository implements IRuleRepository {
  async create(rule: string, ruleTitle: string): Promise<Rule> {
    const newRule = await prisma.rule.create({
      data: {
        title: ruleTitle,
        rule,
        metadata: {
          create: []
        }
      },
      include: {
        metadata: true
      }
    });
    return new Rule(newRule.id, newRule.title, newRule.rule, newRule.createdAt);
  }

  async getById(id: string): Promise<Rule | null> {
    const rule = await prisma.rule.findUnique({
      where: { id },
      include: {
        metadata: true
      }
    });
    if (!rule) return null;
    return new Rule(rule.id, rule.title, rule.rule, rule.createdAt);
  }

  async getAll(): Promise<Rule[]> {
    const rules = await prisma.rule.findMany({
      include: {
        metadata: true
      }
    });
    //@ts-ignore
    return rules.map(rule => new Rule(rule.id, rule.title, rule.rule, rule.createdAt));
  }
}
