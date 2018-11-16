// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { ICommand, inject, injectable, named } from "@robotlegsjs/core";

@injectable()
export class CallbackCustomPayloadCommand implements ICommand {
    @inject(String)
    public stringValue: string;

    @inject("Function")
    @named("reportingFunction")
    public reportingFunction: Function;

    public execute(): void {
        this.reportingFunction(this.stringValue);
    }
}
