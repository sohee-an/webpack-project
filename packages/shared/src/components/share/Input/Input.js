import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
export const Input = forwardRef(({ icon, ...props }, ref) => {
    return (_jsxs("div", { className: "flex items-center bg-gray-600 rounded-md p-1.5", children: [icon, _jsx("input", { ref: ref, ...props, type: "text", className: "bg-transparent outline-none text-white placeholder-white flex-1 text-sm" })] }));
});
//# sourceMappingURL=Input.js.map