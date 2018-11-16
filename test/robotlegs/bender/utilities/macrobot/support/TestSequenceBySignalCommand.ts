// ------------------------------------------------------------------------------
//  Copyright (c) Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "@robotlegsjs/core";
import { SequenceMacro } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/SequenceMacro";
import { CallbackParametersCommand } from "./CallbackParametersCommand";
import { CallbackParametersSequenceCommand } from "./CallbackParametersSequenceCommand";

@injectable()
export class TestSequenceBySignalCommand extends SequenceMacro {
    public prepare(): void {
        this.add(CallbackParametersCommand);
        this.add(CallbackParametersSequenceCommand);
    }

    public execute(payload?: any, ...payloads: any[]): void {
        super.execute(payload, ...payloads);
    }
}
