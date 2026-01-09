module.exports = [
"[project]/src/components/typing/virtual-keyboard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const KEY_LAYOUT = [
    [
        "`",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "-",
        "=",
        "Backspace"
    ],
    [
        "Tab",
        "q",
        "w",
        "e",
        "r",
        "t",
        "y",
        "u",
        "i",
        "o",
        "p",
        "[",
        "]",
        "\\"
    ],
    [
        "CapsLock",
        "a",
        "s",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        ";",
        "'",
        "Enter"
    ],
    [
        "Shift",
        "z",
        "x",
        "c",
        "v",
        "b",
        "n",
        "m",
        ",",
        ".",
        "/",
        "Shift"
    ],
    [
        " ",
        " "
    ]
];
const SPECIAL_KEYS = {
    " ": "Space"
};
const VirtualKeyboard = ({ currentKey, nextKey })=>{
    const getKeyStyle = (key, keyIndex)=>{
        const lowerKey = key.toLowerCase();
        const lowerCurrentKey = currentKey?.toLowerCase();
        const lowerNextKey = nextKey?.toLowerCase();
        // The fourth row (index 3) contains two "Shift" keys.
        // We differentiate them by their position.
        const isLeftShift = key === 'Shift' && keyIndex === 0;
        const isRightShift = key === 'Shift' && keyIndex > 0;
        const isCurrent = lowerCurrentKey === lowerKey || lowerCurrentKey === 'shift' && key === 'Shift';
        const isNext = lowerNextKey === lowerKey && !isLeftShift && !isRightShift || nextKey && nextKey === nextKey.toUpperCase() && nextKey.toLowerCase() === lowerKey && key === 'Shift';
        return {
            "bg-primary text-primary-foreground scale-110": isCurrent,
            "bg-accent text-accent-foreground": isNext && !isCurrent,
            "flex-grow-[2]": [
                "Backspace",
                "Enter"
            ].includes(key) || isRightShift,
            "flex-grow-[2.5]": isLeftShift,
            "flex-grow-[1.5]": [
                "Tab",
                "CapsLock",
                "\\"
            ].includes(key),
            "flex-grow-[8]": key === " "
        };
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-1.5 rounded-lg bg-muted p-4 shadow-inner md:gap-2",
        children: KEY_LAYOUT.map((row, rowIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex w-full justify-center gap-1.5 md:gap-2",
                children: row.map((key, keyIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex h-10 w-10 flex-grow items-center justify-center rounded-md border-b-2 bg-background font-mono text-sm font-medium transition-all duration-100 ease-in-out md:h-12 md:w-12 md:text-base", getKeyStyle(key, keyIndex)),
                        children: SPECIAL_KEYS[key] || key
                    }, `${key}-${rowIndex}-${keyIndex}`, false, {
                        fileName: "[project]/src/components/typing/virtual-keyboard.tsx",
                        lineNumber: 57,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)))
            }, rowIndex, false, {
                fileName: "[project]/src/components/typing/virtual-keyboard.tsx",
                lineNumber: 55,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/src/components/typing/virtual-keyboard.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].memo(VirtualKeyboard);
}),
];

//# sourceMappingURL=src_components_typing_virtual-keyboard_tsx_37cefdbd._.js.map