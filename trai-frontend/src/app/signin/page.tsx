"use client"

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../(store)/store";
import { setEmail, setPassword, setToken, clearEmail, clearPassword, clearToken } from "../(store)/slices/credentials";
import supabase from "../(supabase)/config";
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SignIn() {

    const email = useSelector((state: RootState) => state.credentials.email);
    const password = useSelector((state: RootState) => state.credentials.password);
    const token = useSelector((state: RootState) => state.credentials.token);
    const dispatch = useDispatch();

    const handleSignIn = async () => {
        let { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        dispatch(clearEmail());
        dispatch(clearPassword());
    }

    return(
        <div className="flex flex-row justify-center">
            <Card className="md:w-[400px] w-full m-10 mt-20">
                <CardHeader>
                <CardTitle className="text-3xl">Login</CardTitle>
                {/* <CardDescription>
                    Enter your email below to login to your account
                </CardDescription> */}
                </CardHeader>
                <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                    <div className="grid gap-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                        onChange={(e) => dispatch(setEmail(e.target.value))}
                        id="email"
                        type="email"
                        // placeholder="m@example.com"
                        required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        {/* <a
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a> */}
                        </div>
                        <Input onChange={(e) => dispatch(setPassword(e.target.value))}
                         id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full" onClick={(e) => handleSignIn()}>
                        Login
                    </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a href="/signup" className="underline underline-offset-4">
                        Sign up
                    </a>
                    </div>
                </form>
                </CardContent>
            </Card>
        </div>
    )
}