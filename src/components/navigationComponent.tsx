"use client";
import { useState } from "react";
import { useAuthStore } from "../stores/auntificationStore";



export default function Navigation() {
    return (
        <nav className="bg-primary min-h-20 mb-10 text-white text-2xl flex items-center justify-center">
            Здравствуйте {useAuthStore.getState().username}
        </nav>
    )
}