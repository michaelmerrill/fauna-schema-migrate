import { TaggedExpression } from "../types/expressions";

export class TriedChangingMissingCloudResourceError extends Error {
    constructor(m: TaggedExpression) {
        const message = `Migration calculation requires a change to a resource ${m.name} of type ${m.type} which is no longer present in cloud`
        super(message);

        Object.setPrototypeOf(this, TriedChangingMissingCloudResourceError.prototype);
    }
}