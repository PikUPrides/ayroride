"use client";
{
  /** 
import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bold, Italic } from "lucide-react";

export default function CommentForm() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [comment, setComment] = useState("");
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isExpanded && editorRef.current) {
            editorRef.current.focus();
        }
    }, [isExpanded]);

    const handleFocus = () => {
        setIsExpanded(true);
    };

    const handleCancel = () => {
        setIsExpanded(false);
        setComment("");
        if (editorRef.current) {
            editorRef.current.innerHTML = "";
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle submission logic here
        console.log("Submitted:", comment);
        setIsExpanded(false);
        setComment("");
        if (editorRef.current) {
            editorRef.current.innerHTML = "";
        }
    };

    const handleFormat = (command: string) => {
        document.execCommand(command, false, undefined);
        if (editorRef.current) {
            editorRef.current.focus();
            setComment(editorRef.current.innerHTML);
        }
    };

    return (
        <div className="flex gap-4 w-full max-w-[800px] mx-auto p-4 bg-white rounded-lg">
            <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex-1">
                {!isExpanded ? (
                    <div
                        onClick={handleFocus}
                        className="w-full px-4 py-3 bg-gray-100 rounded-full text-gray-500 cursor-text hover:bg-gray-200 transition-colors"
                    >
                        What are your thoughts?
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        <div className="relative">
                            <div
                                ref={editorRef}
                                contentEditable
                                onInput={(e) => setComment(e.currentTarget.innerHTML)}
                                className="w-full min-h-[120px] p-3 bg-gray-50 rounded-lg border-none focus:ring-0 focus:outline-none resize-none text-gray-900 overflow-auto"
                                onFocus={handleFocus}
                            />
                            {!comment && (
                                <div
                                    className="absolute top-3 left-3 text-gray-400 pointer-events-none"
                                >
                                    What are your thoughts?
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between mt-2">
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => handleFormat("bold")}
                                    className="h-8 w-8 text-gray-500 hover:text-gray-900"
                                >
                                    <Bold className="h-4 w-4" />
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => handleFormat("italic")}
                                    className="h-8 w-8 text-gray-500 hover:text-gray-900"
                                >
                                    <Italic className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={handleCancel}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-[#346BFF] text-white hover:bg-blue-600 rounded-full px-6"
                                    disabled={!comment || comment === "<br>"}
                                >
                                    Respond
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
*/
}
