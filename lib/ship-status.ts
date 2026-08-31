export const SHIP_STATUS = {
    PENDING: "pending",
    APPROVED: "approved",
    REJECTED: "rejected",
    PERM_REJECTED: "perm_rejected"
} as const;

export type ShipStatus = (typeof SHIP_STATUS)[keyof typeof SHIP_STATUS];

export function getShipStatusLabel(status: ShipStatus) {
    switch (status) {
        case SHIP_STATUS.PENDING:
            return {
                label: "SHIPPED",
                className: "bg-[#fdf0c2] text-[#8a6812] border-[#c9a030]"
            }
        case SHIP_STATUS.APPROVED:
            return {
                label: "APPROVED",
                className: "bg-[#d9f2c7] text-[#315b24] border-[#8a6812]"
            }
        case SHIP_STATUS.REJECTED:
            return {
                label: "REJECTED",
                className: "bg-[#f8d7d7] text-[#8b2525] border-[#8b2525]"

            }
        case SHIP_STATUS.PERM_REJECTED:
            return {
                label: "PERMANENTLY REJECTED",
                className: "bg-[#e5caca] text-[#5c1616] border-[#5c1616]"
            }
        default:
            return null;
    }
}