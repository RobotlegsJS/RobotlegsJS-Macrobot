// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, named } from "inversify";

import { SequenceMacro } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/SequenceMacro";

import { ReportStringCommand } from "./ReportStringCommand";

@injectable()
export class TestSequenceWithCompleteCallbackCommand extends SequenceMacro {
    @inject("Function")
    @named("reportingFunction")
    protected _report: Function;

    public prepare(): void {
        this.add(ReportStringCommand).withPayloads("Command 1");
        this.add(ReportStringCommand).withPayloads("Command 2");
        this.add(ReportStringCommand).withPayloads("Command 3");

        this.registerCompleteCallback(this.onComplete.bind(this));
    }

    protected onComplete(): void {
        this._report("All commands have been executed!");
    }
}
