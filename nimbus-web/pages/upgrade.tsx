import React from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import ErrorMessage from "@/components/ErrorMessage";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import upgradePremiumStatus from "utils/updatePremiumStatus";

const Upgrade = () => {
    const { user, isLoading } = useUser();
    const router = useRouter();
    const handleUpgrade = async (upgradeType: string) => {
        if (user && user.premium === "None") {
            try {
                const response = await fetch(
                    `/api/upgradeUser/${user.sub}/${upgradeType}`
                );
                if (response.ok) {
                    alert("Upgrade complete!");
                    sessionStorage.removeItem("session-id");
                    upgradePremiumStatus(user);
                    router.push("/");
                } else {
                    alert("Unknown error occured");
                }
            } catch (e) {
                console.log(e);
                alert(`Error occured ${e}`);
            }
        } else {
            console.log("user is already premium");
        }
    };
    return (
        <div className="grid place-items-center min-h-screen h-full pt-24 bg-neutral-100 text-black">
            <button onClick={() => handleUpgrade("Monthly")}>
                Upgrade to Monthly Plan
            </button>
            <button onClick={() => handleUpgrade("Yearly")}>
                Upgrade to Yearly Plan
            </button>
        </div>
    );
};

export default withPageAuthRequired(Upgrade, {
    onRedirecting: () => <Loading />,
    onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});
