import { Check, Clock, RotateCcw, X } from "lucide-react";

type ShipEvent = {
    id: number;
    createdAt: Date;
    approvalStatus: string;
    reviewerNote: string | null;
    auditNote: string | null;
    withdrawnAt: Date | null;
    seconds: number;
    potsAwarded: number;
    approvedSeconds: number
}
type Props = {
    events: ShipEvent[]
}
export default function ReviewTimeLine({ events }: Props) {
    if (!events.length) {
        return null
    }
    const timeLine = [...events].reverse();
    return (
        <div className="mt-8">
            <h2 className="text-3xl font-bold text-[#2a1a08]">Review Timeline</h2>
            <div className="relative ml-4">
                <div className="absolute left-5 top-3 bottom-3 w-[3px] bg-[#c9a030]" />
                <div className="flex flex-col gap-6">
                    {timeLine.map((event) => {
                        const withdrawn = !!event.withdrawnAt;
                        return (
                            <TimelineEvent key={event.id} event={event} withdrawn={withdrawn} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

function TimelineEvent({
    event,
    withdrawn
}: {
    event: ShipEvent,
    withdrawn: boolean
}) {
    let icon;
    let title;
    let iconClass;
    if (withdrawn) {
        icon = <RotateCcw size={20} />;
        title = "WITHDRAWN";
        iconClass = "bg-[#e8e0cf] text-[#6b5a32]";
    } else if (event.approvalStatus === "approved") {
        icon = <Check size={20} />;
        title = "APPROVED";
        iconClass = "bg-[#d9f2c7] text-[#315b24]";
    } else if (event.approvalStatus === "perm_rejected") {
        icon = <X size={20} />;
        title = "REJECTED";
        iconClass = "bg-[#f8d7d7] text-[#8b2525]";
    } else if (event.approvalStatus === "pending") {
        icon = <Clock size={20} />;
        title = "SHIPPED";
        iconClass = "bg-[#fdf0c2] text-[#8a6812]";
    
    } else if (event.approvalStatus === "changes_requested") {
        icon = <Clock size={20} />;
        title = "CHANGED REQUESTED";
        iconClass = "bg-[#fdf0c2] text-[#8a6812]";
    }

     return(
        <div className="relative flex gap-4">
            <div className={`relative z-10 shrink-0 w-10 h-10 rounded-full border-2 items-center flex justify-center border-[#c9a030] ${iconClass}`}>
                {icon}
            </div>
            <div className="flex-1 border-2 border-[#c9a030] rounded-2xl bg-[#fd0c2] p-4">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-bold text-[#2a1a08]">{title} </h3>
                    <span className="text-sm text-[#6b4a32]">{event.approvalStatus == 'approved' && `${ Math.floor(event.seconds / 3600)}h ${Math.floor((event.seconds % 3600) / 60)}m shipped - ${ Math.floor(event.approvedSeconds / 3600)}h ${Math.floor((event.approvedSeconds % 3600) / 60)}m approved - ${event.potsAwarded} pots`}</span>
                    <span className="text-sm text-[#6b4a32]">{formatDate(event.createdAt)}</span>
                </div>
                {event.reviewerNote && (
                    <div className="mt-3">
                        <p className="text-sm font-bold text-[#6b5a32]">Reviewer Note</p>
                        <p className="text-lg text-[2a1a08]">{event.reviewerNote}</p>
                    </div>
                )}
                {withdrawn && event.withdrawnAt && (
                    <p className="mt-3 text-sm text-[#6b5a32]">
                        Withdrawn on {formatDate(event.withdrawnAt)}
                    </p>
                ) }
            </div>

        </div>
     )
}

function formatDate(date : Date | string){
    return new Intl.DateTimeFormat(undefined, {
        day : "numeric",
        month : "short",
        year : "numeric",
        hour : 'numeric',
        minute : "2-digit",
    }).format(new Date(date))
}