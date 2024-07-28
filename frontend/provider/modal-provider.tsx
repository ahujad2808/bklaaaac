import { CombineRuleModal } from "@/components/modals/combine-rule-modal";
import { CreateRuleModal } from "@/components/modals/create-rule-modal"
import { MatchRuleModal } from "@/components/modals/match-rule-modal";

interface ModalProviderProps{
    rules: any[];
}
export const ModalProvider = ({
    rules
}: ModalProviderProps) => {
    return (
        <>
            <MatchRuleModal rules={rules}/>
            <CombineRuleModal/>
            <CreateRuleModal/>
        </>
    )
}