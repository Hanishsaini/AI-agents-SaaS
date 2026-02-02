
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-gray-500">
                    This is how others will see you on the site.
                </p>
            </div>
            <div className="border-t pt-4">
                <form className="space-y-4 max-w-xl">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Username</label>
                        <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm" placeholder="username" />
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Bio</label>
                        <textarea className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm" placeholder="Tell us a little bit about yourself" />
                    </div>
                    <Button>Update Profile</Button>
                </form>
            </div>
        </div>
    )
}
