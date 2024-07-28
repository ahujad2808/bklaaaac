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
import toast from "react-hot-toast";
import { createRule } from "@/actions/rule/create.action";


export const CreateRuleModal = () => {

    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === "createRuleModal"

    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const form = useForm({
        defaultValues: {
          rule: "",
        },
    });

    const onSubmit = (data: any) => {
        setLoading(true);
        startTransition(() => {
            createRule(data)
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
        <div key="rule">
            <Form {...form}>
                <FormField
                    control={form.control}
                    name="rule"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input 
                                    className="focus-visible:ring-transparent focus:ring-0" 
                                    placeholder="Rule" 
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Form>
        </div>
    )

    return (
        <Modal
            type="dialog"
            title="Create a new rule"
            description={"Add rule details"}
            onClose={handleClose}
            onSubmit={form.handleSubmit(onSubmit)}
            actionLabel={'Create'}
            secondaryAction={handleClose}
            secondaryActionLabel={'Cancel'}
            isOpen={isModalOpen}
            body={bodyContent}
            disabled={loading}
        />
    )
}