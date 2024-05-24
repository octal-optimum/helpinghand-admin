
export const API_BASE_URL = 
process.env.API_BASE_URL || "http://13.233.245.242:4001/api/v1";

export const API_PATHS = {
    API_BASE_URL,
    login: "/admin/login",

    //category
    getCategory : "/admin/categories/get",
    AddCategory:"/admin/categories/create",
    deleteCategory:"/admin/categories/delete",
    editCategory:"/admin/categories/edit",

    // services
    getService:"/admin/services/get",
    AddServices:"/admin/services/create" ,
    deleteService:"/admin/services/delete",
    editService:"/admin/services/edit",

    //slots
    getSlots:"/admin/slots/get",
    deleteSlot:"/admin/slots/delete",
    AddSlots:"/admin/slots/create",
    EditSlots:"/admin/slots/edit",

    //slots discount 
    getSlotsDiscounts:"/admin/slot-discount/get",
    deleteSlotDiscounts:"/admin/slot-discount/delete",
    AddSlotsDiscounts:"/admin/slot-discount/create",
    EditSlotsDiscounts:"/admin/slot-discount/edit",


    //promocodes 
    getpromocodes:"/admin/promo-code/get",
    deletepromocodes:"/admin/promo-code/delete",
    addpromocodes:"/admin/promo-code/create",
    editpromocodes:"/admin/promo-code/edit",


    getbooking:"/admin/get-all-bookings",
    getrelevantpartners:"/admin/get-relavent-partners",
    allotpartners:"/admin/allot-partners",
    cancelbooking:"/admin/cancel-booking",

    getallpartners:"/admin/get-all-partners",
    getallcustomers:"/admin/get-all-customers",
    getpartnerdocuments:"/admin/get-partner-documents",
    verifypartner:"/admin/verify-partner"
};