import Sidebar from "@/app/components/Sidebar";

export default function QuickPicksPage() {
    return (
        <div className="flex h-screen overflow-hidden bg-[#110D24]">
            <Sidebar />
            <main className="flex-1 min-w-0 overflow-y-auto">
                
                {/* Page header */}
                <div className="px-8 pt-10 pb-0">
                    <div className="flex flex-col gap-8">
                        
                        {/* Title */}
                        <div>
                            <h1 className="text-3xl font-extrabold text-white tracking-tight">Quick Picks</h1>
                            <p>
                                One artist. One decision.
                            </p>
                        </div>

                        {/* Session Setup */}

                        {/* Start Session Button */}
                    </div>
                </div>


            </main>
        </div>
    )
}
