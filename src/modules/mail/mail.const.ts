export enum MAIL_SUBJECT {
    CREATE_ORDER = 'TẠO YÊU CẦU LẤY QUẦN ÁO',
    SORT_ORDER = 'SORT ORDER THÀNH CÔNG',
    RETURN_ORDER = 'THÔNG BÁO GỬI TRẢ'
}

export enum MAIL_TEMPLATE {
    CREATE_ORDER = '.templates/order',
    SORT_ORDER = '.templates/sort-order',
    RETURN_ORDER = '.templates/return-order',
}

export const MAIL = {
    CREATE_ORDER: {
        SUBJECT: MAIL_SUBJECT.CREATE_ORDER,
        TEMPLATE: MAIL_TEMPLATE.CREATE_ORDER
    },
    SORT_ORDER: {
        SUBJECT: MAIL_SUBJECT.SORT_ORDER,
        TEMPLATE: MAIL_TEMPLATE.SORT_ORDER
    },
    RETURN_ORDER: {
        SUBJECT: MAIL_SUBJECT.RETURN_ORDER,
        TEMPLATE: MAIL_TEMPLATE.RETURN_ORDER
    }, 
}