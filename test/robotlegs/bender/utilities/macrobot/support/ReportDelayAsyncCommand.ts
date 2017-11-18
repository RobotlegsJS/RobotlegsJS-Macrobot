// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, named, optional } from "inversify";

import { AsyncCommand } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/AsyncCommand";

@injectable()
export class ReportDelayAsyncCommand extends AsyncCommand {
    @inject("Function")
    @named("reportingFunction")
    protected _report: Function;

    @inject(String) protected _name: string;

    @inject(Number) protected _delay: number;

    @inject(Boolean)
    @optional()
    protected _succeed: boolean;

    public execute(): void {
        this._succeed = this._succeed === undefined ? true : this._succeed;
        this._report(
            "Start execution of " +
                this._name +
                " and await " +
                this._delay +
                " milliseconds"
        );
        setTimeout(this.onTimeout.bind(this), this._delay);
    }

    protected onTimeout(): void {
        if (this._succeed) {
            this._report("Complete execution of " + this._name);
        } else {
            this._report("Execution of " + this._name + " failed!");
        }
        this.dispatchComplete(this._succeed);
    }
}