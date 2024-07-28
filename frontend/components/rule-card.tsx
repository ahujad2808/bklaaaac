import { Card, CardDescription, CardTitle } from "./ui/card";

interface RuleCardProps{
    rule: any;
}

export const RuleCard = ({
    rule,
} : RuleCardProps) => {

    return (
        <Card className="p-6 pr-8">
            <CardTitle>
                {rule.title}
            </CardTitle>
            <CardDescription className="mt-4">
                This is a rule of the card
                This is a rule of the card
                This is a rule of the card
            </CardDescription>
        </Card>
    )
}