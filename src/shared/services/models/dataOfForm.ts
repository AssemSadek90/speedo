export class DataOfForm {
    constructor(public amountToSend: number, public amountToRecieve: number, public currencyToSend: string, public currencyToRecieve: string, public fromName: string, public toName :string, public fromAccNum: number, public toAccNum: number, public fees: number) {}
}