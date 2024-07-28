import { RuleCard } from "./rule-card";

interface HomeClientProps{
    rules: any[];
}

export const HomeClient = ({
    rules,
} : HomeClientProps) => {


    if (!rules || rules.length === 0) {
        return (
            <div className="h-full w-full">
                No rules found, create one
            </div>
        );
    }


    return (
        <div className="w-full h-full">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
                {rules.map(rule => (
                    <div key={rule.id}>
                        <RuleCard rule={rule}/>
                    </div>
                ))}
            </div>
        </div>
    );
}