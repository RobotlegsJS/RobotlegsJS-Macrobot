// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, named } from "inversify";

import { ICommand } from "@robotlegsjs/core";

import { SubCommandPayload } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/SubCommandPayload";
import { SequenceMacro } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/SequenceMacro";

import { ReportStringCommand } from "./ReportStringCommand";

@injectable()
export class TestSequenceWithPayloadsCommand extends SequenceMacro {
    public prepare(): void {
        this.add(ReportStringCommand).withPayloads(
            new SubCommandPayload("Hello", String)
        );
        this.add(ReportStringCommand).withPayloads(
            new SubCommandPayload("World", String)
        );
        this.add(ReportStringCommand).withPayloads(
            new SubCommandPayload("!", String)
        );
    }
}
