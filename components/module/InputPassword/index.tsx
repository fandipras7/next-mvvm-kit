import { Input } from "@/components/base/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputPassword = ({ ...props }: Props) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative w-full">
            <Input 
                type={showPassword ? "text" : "password"} 
                {...props} 
                className="pr-10"
            />
            <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
    );
};

export default InputPassword;
