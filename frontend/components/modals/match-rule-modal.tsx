"use client"

import { useCallback, useState, useTransition } from "react";
import { Modal } from "./modal"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { 
    Form, 
    FormControl, 
    FormDescription, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form"
import { Input } from "../ui/input";
import Rule from "postcss/lib/rule";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { matchRule } from "@/actions/rule/match.action";
import toast from "react-hot-toast";

interface MatchRuleModalProps{
    rules: any[]
}

export const MatchRuleModal = ({
    rules,
} : MatchRuleModalProps) => {

    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === "matchRuleModal";

    const [selectedRule, setSelectedRule] = useState<string>('');

    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);


    const router = useRouter();
    const form = useForm({
        defaultValues: {
          rule: "",
          age: "",
          department: "",
          salary: "",
          experience: "",
        },
    });

    
    const handleRuleSelect = (rule: string) => {
        setSelectedRule(rule);
        form.setValue('rule', rule);
    }

    const handleClose = useCallback(() => {
        form.setValue('rule', '');
        setSelectedRule('');
        form.reset()
        onClose();
    }, []);


    const onSubmit = (data: any) => {
        console.log(data)
        setLoading(true);
        startTransition(() => {
            matchRule(data)
                .then((res : any) => {
                    if(res.matched){
                        toast.success("Matched")
                    }
                    else if(res.notMatched){
                        toast.error("Criteria not matched")
                    }
                    else if(res.error){
                        toast.error("Something went wrong")
                    }
                })
                .finally(() => {
                    router.refresh();
                    handleClose();
                    setLoading(false);
                })
        })
    }

    let bodyContent = (
        <div className="flex flex-col w-full gap-4">
            <div key="rule">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant={'outline'} className="max-w-[32vw] w-[32vw]">
                            {selectedRule ? selectedRule : "Select a rule"}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {rules && (
                            <>
                                {rules.map((rule, index) => (
                                    <DropdownMenuItem key={index} onClick={() => handleRuleSelect(rule.title)}>
                                        {rule.title}
                                    </DropdownMenuItem>
                                ))}
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div key="age">
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        className="focus-visible:ring-transparent focus:ring-0" 
                                        placeholder="Age" 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Form>
            </div>

            <div key="department">
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        className="focus-visible:ring-transparent focus:ring-0" 
                                        placeholder="Department" 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Form>
            </div>

            <div key="salary">
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="salary"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        className="focus-visible:ring-transparent focus:ring-0" 
                                        placeholder="Salary" 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Form>
            </div>

            <div key="experience">
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        className="focus-visible:ring-transparent focus:ring-0" 
                                        placeholder="Experience" 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Form>
            </div>

        </div>
        
    )

    return (
        <Modal
            type="dialog"
            title="Match a new rule"
            description={"Add rule details"}
            onClose={handleClose}
            onSubmit={form.handleSubmit(onSubmit)}
            actionLabel={'Match'}
            secondaryAction={handleClose}
            secondaryActionLabel={'Cancel'}
            isOpen={isModalOpen}
            body={bodyContent}
            disabled={loading}
        />
    )
}