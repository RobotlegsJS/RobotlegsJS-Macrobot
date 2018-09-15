// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import {
    IContext,
    IInjector,
    IEventDispatcher,
    IEventCommandMap,
    Context,
    Event,
    EventCommandMap,
    EventDispatcher
} from "@robotlegsjs/core";

import { TestAddAndRemoveParallelCommand } from "../support/TestAddAndRemoveParallelCommand";
import { TestParallelCommand } from "../support/TestParallelCommand";
import { TestParallelWithCompleteCallbackCommand } from "../support/TestParallelWithCompleteCallbackCommand";
import { TestParallelWithPayloadCommand } from "../support/TestParallelWithPayloadCommand";
import { TestEmptyParallelCommand } from "../support/TestEmptyParallelCommand";

describe("ParallelMacro", () => {
    let context: IContext;
    let injector: IInjector;
    let dispatcher: IEventDispatcher;
    let eventCommandMap: IEventCommandMap;
    let reported: any[];

    function reportingFunction(item: any): void {
        reported.push(item);
    }

    beforeEach(() => {
        context = new Context();
        injector = context.injector;
        injector
            .bind("Function")
            .toFunction(reportingFunction)
            .whenTargetNamed("reportingFunction");
        dispatcher = new EventDispatcher();
        eventCommandMap = new EventCommandMap(context, dispatcher);
        context.initialize();
        reported = [];
    });

    afterEach(() => {
        if (context.initialized) {
            context.destroy();
        }

        context = null;
        injector = null;
        dispatcher = null;
        eventCommandMap = null;
        reported = null;
    });

    it("commands_are_executed_in_parallell", (done: Function) => {
        eventCommandMap.map("trigger", Event).toCommand(TestParallelCommand);
        dispatcher.dispatchEvent(new Event("trigger"));

        setTimeout(() => {
            assert.deepEqual(reported, [
                "Start execution of Command 1 and await 100 milliseconds",
                "Start execution of Command 2 and await 75 milliseconds",
                "Start execution of Command 3 and await 50 milliseconds",
                "Start execution of Command 4 and await 25 milliseconds",
                "Complete execution of Command 4",
                "Complete execution of Command 3",
                "Complete execution of Command 2",
                "Complete execution of Command 1"
            ]);

            done();
        }, 250);
    });

    it("removed_commands_are_not_executed", (done: Function) => {
        eventCommandMap.map("trigger", Event).toCommand(TestAddAndRemoveParallelCommand);
        dispatcher.dispatchEvent(new Event("trigger"));
        setTimeout(() => {
            assert.deepEqual(reported, [
                "Start execution of Command 1 and await 100 milliseconds",
                "Start execution of Command 2 and await 75 milliseconds",
                "Start execution of Command 3 and await 50 milliseconds",
                1,
                "Complete execution of Command 3",
                "Complete execution of Command 2",
                "Complete execution of Command 1"
            ]);

            done();
        }, 250);
    });

    it("commands_are_executed_in_parallel_and_complete_callback_is_called", (done: Function) => {
        eventCommandMap.map("trigger", Event).toCommand(TestParallelWithCompleteCallbackCommand);
        dispatcher.dispatchEvent(new Event("trigger"));

        setTimeout(() => {
            assert.deepEqual(reported, [
                "Start execution of Command 1 and await 100 milliseconds",
                "Start execution of Command 2 and await 75 milliseconds",
                "Start execution of Command 3 and await 50 milliseconds",
                "Start execution of Command 4 and await 25 milliseconds",
                "Complete execution of Command 4",
                "Complete execution of Command 3",
                "Complete execution of Command 2",
                "Complete execution of Command 1",
                "All commands have been executed!"
            ]);

            done();
        }, 250);
    });

    it("empty_parallel_command_is_still_executed", (done: Function) => {
        eventCommandMap.map("trigger", Event).toCommand(TestEmptyParallelCommand);
        dispatcher.dispatchEvent(new Event("trigger"));

        setTimeout(() => {
            assert.deepEqual(reported, []);
            done();
        }, 50);
    });

    it("event_is_mapped_in_the_context_of_sub_commands", (done: Function) => {
        const event: Event = new Event("trigger");
        event.data = "Event triggered command";
        eventCommandMap.map("trigger", Event).toCommand(TestParallelWithPayloadCommand);
        dispatcher.dispatchEvent(event);

        setTimeout(() => {
            assert.deepEqual(reported, [
                "Event triggered command: start execution of Command 1 and await 100 milliseconds",
                "Event triggered command: start execution of Command 2 and await 75 milliseconds",
                "Event triggered command: start execution of Command 3 and await 50 milliseconds",
                "Event triggered command: start execution of Command 4 and await 25 milliseconds",
                "Event triggered command: complete execution of Command 4",
                "Event triggered command: complete execution of Command 3",
                "Event triggered command: complete execution of Command 2",
                "Event triggered command: complete execution of Command 1"
            ]);

            done();
        }, 250);
    });
});
