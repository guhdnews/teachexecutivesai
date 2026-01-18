"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth, useUser } from "@/contexts";
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { getClientAuth, getClientDb } from "@/lib/firebase";
import { toast } from "sonner";
import { Loader2, User, Lock, CreditCard, Shield, Trash2 } from "lucide-react";
import Link from "next/link";

// Profile form schema
const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
});

// Password form schema
const passwordSchema = z
    .object({
        currentPassword: z.string().min(1, "Please enter your current password"),
        newPassword: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Za-z]/, "Password must contain at least one letter")
            .regex(/[0-9]/, "Password must contain at least one number"),
        confirmPassword: z.string().min(1, "Please confirm your new password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export function SettingsContent() {
    const { user } = useAuth();
    const { profile, refreshProfile } = useUser();
    const [activeTab, setActiveTab] = useState("profile");
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [isDeletingAccount, setIsDeletingAccount] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const profileForm = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: profile?.name || "",
        },
    });

    const passwordForm = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
    });

    // Update profile
    const onUpdateProfile = async (data: ProfileFormData) => {
        if (!user) return;

        const db = getClientDb();
        if (!db) {
            toast.error("Firebase is not configured.");
            return;
        }

        try {
            setIsUpdatingProfile(true);

            // Update Firebase Auth display name
            await updateProfile(user, { displayName: data.name });

            // Update Firestore
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { name: data.name });

            await refreshProfile();
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    // Update password
    const onUpdatePassword = async (data: PasswordFormData) => {
        if (!user || !user.email) return;

        try {
            setIsUpdatingPassword(true);

            // Re-authenticate first
            const credential = EmailAuthProvider.credential(user.email, data.currentPassword);
            await reauthenticateWithCredential(user, credential);

            // Update password
            await updatePassword(user, data.newPassword);

            passwordForm.reset();
            toast.success("Password updated successfully!");
        } catch (error: unknown) {
            console.error("Error updating password:", error);
            if (error && typeof error === "object" && "code" in error) {
                const code = (error as { code: string }).code;
                if (code === "auth/wrong-password") {
                    toast.error("Current password is incorrect.");
                } else {
                    toast.error("Failed to update password. Please try again.");
                }
            } else {
                toast.error("Failed to update password. Please try again.");
            }
        } finally {
            setIsUpdatingPassword(false);
        }
    };

    // Delete account (soft delete)
    const handleDeleteAccount = async () => {
        if (!user) return;

        const db = getClientDb();
        const auth = getClientAuth();
        if (!db || !auth) {
            toast.error("Firebase is not configured.");
            return;
        }

        try {
            setIsDeletingAccount(true);

            // Soft delete - just mark as deleted
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                deletedAt: serverTimestamp(),
            });

            // Sign out
            await auth.signOut();

            toast.success("Your account has been deleted. You have 30 days to recover it.");
        } catch (error) {
            console.error("Error deleting account:", error);
            toast.error("Failed to delete account. Please try again.");
        } finally {
            setIsDeletingAccount(false);
            setShowDeleteConfirm(false);
        }
    };

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "security", label: "Security", icon: Lock },
        { id: "billing", label: "Billing", icon: CreditCard },
        { id: "danger", label: "Danger Zone", icon: Shield },
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-h1 text-navy-800 mb-8">Settings</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Tabs */}
                <div className="md:w-48 flex-shrink-0">
                    <nav className="flex md:flex-col gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                                    ? "bg-navy-800 text-white"
                                    : "text-navy-600 hover:bg-navy-100"
                                    }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content */}
                <div className="flex-1">
                    {/* Profile Tab */}
                    {activeTab === "profile" && (
                        <div className="card">
                            <h2 className="text-h2 text-navy-800 mb-6">Profile Information</h2>
                            <form onSubmit={profileForm.handleSubmit(onUpdateProfile)} className="space-y-5">
                                <div>
                                    <label htmlFor="email" className="label">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={user?.email || ""}
                                        disabled
                                        className="input bg-navy-50"
                                    />
                                    <p className="text-sm text-navy-500 mt-1">
                                        Email cannot be changed
                                    </p>
                                </div>

                                <div>
                                    <label htmlFor="name" className="label">
                                        Full Name
                                    </label>
                                    <input
                                        {...profileForm.register("name")}
                                        type="text"
                                        id="name"
                                        className={`input ${profileForm.formState.errors.name ? "input-error" : ""}`}
                                    />
                                    {profileForm.formState.errors.name && (
                                        <p className="error-message">
                                            {profileForm.formState.errors.name.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isUpdatingProfile}
                                    className="btn btn-primary"
                                >
                                    {isUpdatingProfile ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === "security" && (
                        <div className="card">
                            <h2 className="text-h2 text-navy-800 mb-6">Change Password</h2>
                            <form onSubmit={passwordForm.handleSubmit(onUpdatePassword)} className="space-y-5">
                                <div>
                                    <label htmlFor="currentPassword" className="label">
                                        Current Password
                                    </label>
                                    <input
                                        {...passwordForm.register("currentPassword")}
                                        type="password"
                                        id="currentPassword"
                                        className={`input ${passwordForm.formState.errors.currentPassword ? "input-error" : ""}`}
                                    />
                                    {passwordForm.formState.errors.currentPassword && (
                                        <p className="error-message">
                                            {passwordForm.formState.errors.currentPassword.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="newPassword" className="label">
                                        New Password
                                    </label>
                                    <input
                                        {...passwordForm.register("newPassword")}
                                        type="password"
                                        id="newPassword"
                                        className={`input ${passwordForm.formState.errors.newPassword ? "input-error" : ""}`}
                                    />
                                    {passwordForm.formState.errors.newPassword && (
                                        <p className="error-message">
                                            {passwordForm.formState.errors.newPassword.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="label">
                                        Confirm New Password
                                    </label>
                                    <input
                                        {...passwordForm.register("confirmPassword")}
                                        type="password"
                                        id="confirmPassword"
                                        className={`input ${passwordForm.formState.errors.confirmPassword ? "input-error" : ""}`}
                                    />
                                    {passwordForm.formState.errors.confirmPassword && (
                                        <p className="error-message">
                                            {passwordForm.formState.errors.confirmPassword.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isUpdatingPassword}
                                    className="btn btn-primary"
                                >
                                    {isUpdatingPassword ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Updating...
                                        </>
                                    ) : (
                                        "Update Password"
                                    )}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Billing Tab */}
                    {activeTab === "billing" && (
                        <div className="card">
                            <h2 className="text-h2 text-navy-800 mb-6">Billing & Subscription</h2>

                            <div className="p-4 bg-navy-50 rounded-lg mb-6">
                                <p className="text-navy-600">
                                    <span className="font-semibold">Current Plan:</span>{" "}
                                    {profile?.tier === "launchpad"
                                        ? "Wisdom Consultant Launchpad"
                                        : profile?.tier === "caio"
                                            ? "CAIO Certification"
                                            : profile?.tier === "sop"
                                                ? "AI SOPs Bundle"
                                                : "Free Member"}
                                </p>
                            </div>

                            <p className="text-navy-600 mb-4">
                                Manage your subscription and payment methods through our secure billing portal.
                            </p>

                            <Link
                                href="/api/billing/portal"
                                className="btn btn-secondary"
                            >
                                Manage Billing
                            </Link>
                        </div>
                    )}

                    {/* Danger Zone Tab */}
                    {activeTab === "danger" && (
                        <div className="card border-red-200 bg-red-50">
                            <h2 className="text-h2 text-red-800 mb-6 flex items-center gap-2">
                                <Trash2 className="w-6 h-6" />
                                Danger Zone
                            </h2>

                            <p className="text-navy-700 mb-4">
                                Once you delete your account, there is no going back. Your account
                                will be deactivated immediately and permanently deleted after 30 days.
                            </p>

                            {!showDeleteConfirm ? (
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="btn bg-red-600 text-white hover:bg-red-700"
                                >
                                    Delete My Account
                                </button>
                            ) : (
                                <div className="p-4 bg-white rounded-lg border border-red-200">
                                    <p className="text-red-700 font-semibold mb-4">
                                        Are you absolutely sure? This action cannot be undone.
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleDeleteAccount}
                                            disabled={isDeletingAccount}
                                            className="btn bg-red-600 text-white hover:bg-red-700"
                                        >
                                            {isDeletingAccount ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Deleting...
                                                </>
                                            ) : (
                                                "Yes, Delete My Account"
                                            )}
                                        </button>
                                        <button
                                            onClick={() => setShowDeleteConfirm(false)}
                                            className="btn btn-outline"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
