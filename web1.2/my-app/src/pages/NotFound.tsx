// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">404 — Страница не найдена</h1>
                <Link to="/" className="text-blue-500 hover:underline">
                    Вернуться на главную
                </Link>
            </div>
        </div>
    );
}
