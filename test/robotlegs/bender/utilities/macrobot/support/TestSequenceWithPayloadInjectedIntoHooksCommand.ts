// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "inversify";

import { SequenceMacro } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/SequenceMacro";

import { ReportStringCommand } from "./ReportStringCommand";
import { ReportPayloadHook } from "./ReportPayloadHook";

@injectable()
export class TestSequenceWithPayloadInjectedIntoHooksCommand extends SequenceMacro {
    public prepare(): void {
        this.add(ReportStringCommand)
            .withPayloads("Command 1")
            .withHooks(ReportPayloadHook);
        this.add(ReportStringCommand)
            .withPayloads("Command 2")
            .withHooks(ReportPayloadHook);
        this.add(ReportStringCommand)
            .withPayloads("Command 3")
            .withHooks(ReportPayloadHook);
    }
}
