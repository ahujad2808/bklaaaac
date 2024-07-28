import getRules from "@/actions/rule/get.action";
import { HomeClient } from "@/components/home-client";
import Image from "next/image";

export default async function Home() {

  const ruleResponse = await getRules();
  const rules = ruleResponse.rules

  return (
    <div className="pt-20 px-4 w-full h-full">
      <HomeClient rules={rules}/>
    </div>
  );
}
