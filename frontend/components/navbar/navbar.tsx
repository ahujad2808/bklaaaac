'use client'

import { useModal } from "@/hooks/use-modal-store"
import { Button } from "../ui/button"

export const Navbar = () => {
    const { onOpen } = useModal();
    return (
        <div className="h-20 w-full fixed flex px-4 items-center justify-between bg-white">
            <h1 className="text-xl font-bold">Matcher</h1>
            <div className="flex items-center gap-2">
                <Button
                    onClick={() => {
                        onOpen('createRuleModal')
                    }}
                >
                    Create Rule
                </Button>
                <Button
                    onClick={() => {
                        onOpen('combineRuleModal')
                    }}
                >
                    Combine Rule
                </Button>
                <Button
                    variant={'destructive'}
                    onClick={() => {
                        onOpen('matchRuleModal')
                    }}
                >
                    Match Rule
                </Button>
                
            </div>
        </div>
    )
}