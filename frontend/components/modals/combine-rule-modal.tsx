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
import combineRules from "@/actions/rule/combine.action";
import toast from "react-hot-toast";


export const CombineRuleModal = () => {

    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === "combineRuleModal";

    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const form = useForm({
        defaultValues: {
          rule1: "",
          rule2: "",
        },
    });

    const onSubmit = async (data: any) => {
        setLoading(true);
        startTransition(() => {
            combineRules(data)
                .then((res) => {
                    if(res.success){
                        toast.success("Rule created successfully")
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

    const handleClose = useCallback(() => {
        form.reset()
        onClose();
    }, []);

    let bodyContent = (
        <div className="flex flex-col w-full gap-4">
            <div key="rule1">
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="rule1"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        className="focus-visible:ring-transparent focus:ring-0" 
                                        placeholder="Rule 1" 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Form>
            </div>

            <div key="rule2">
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="rule2"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        className="focus-visible:ring-transparent focus:ring-0" 
                                        placeholder="Rule 2" 
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
            title="Combine rules"
            description={"Add rule details"}
            onClose={handleClose}
            onSubmit={form.handleSubmit(onSubmit)}
            actionLabel={'Combine'}
            secondaryAction={handleClose}
            secondaryActionLabel={'Cancel'}
            isOpen={isModalOpen}
            body={bodyContent}
            disabled={loading}
        />
    )
}