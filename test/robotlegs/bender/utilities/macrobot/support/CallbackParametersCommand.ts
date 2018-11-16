// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { ICommand, inject, injectable, named } from "@robotlegsjs/core";

@injectable()
export class CallbackParametersCommand implements ICommand {
    @inject(Boolean)
    public booleanValue: boolean;

    @inject(Number)
    public numValue: number;

    @inject(String)
    public stringValue: string;

    @inject(Symbol)
    public symbolValue: symbol;

    @inject(Object)
    public objectValue: object;

    @inject(Date)
    public dateValue: Date;

    @inject(Array)
    public arrayValue: any[];

    @inject("Function")
    @named("reportingFunction")
    public reportingFunction: Function;

    public execute(): void {
        if (this.booleanValue) {
            this.reportingFunction(this.booleanValue);
        }

        if (this.numValue) {
            this.reportingFunction(this.numValue);
        }

        if (this.stringValue) {
            this.reportingFunction(this.stringValue);
        }

        if (this.symbolValue) {
            this.reportingFunction(this.symbolValue);
        }

        if (this.objectValue) {
            this.reportingFunction(this.objectValue);
        }

        if (this.dateValue) {
            this.reportingFunction(this.dateValue);
        }

        if (this.arrayValue) {
            this.reportingFunction(this.arrayValue);
        }
    }
}
