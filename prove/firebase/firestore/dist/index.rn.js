import { _getProvider, getApp as t, _removeServiceInstance as e, _registerComponent as n, registerVersion as s, SDK_VERSION as i } from "@firebase/app";

import { Component as r } from "@firebase/component";

import { Logger as o, LogLevel as u } from "@firebase/logger";

import { FirebaseError as a, base64 as c, getUA as h, isIndexedDBAvailable as l, isSafari as f, isMobileCordova as d, isReactNative as _, isElectron as w, isIE as m, isUWP as g, isBrowserExtension as y, createMockUserToken as p, getModularInstance as I, deepEqual as T } from "@firebase/util";

import { XhrIo as E, EventType as A, ErrorCode as R, createWebChannelTransport as P, getStatEventTarget as b, FetchXmlHttpFactory as V, WebChannel as v, Event as S, Stat as D } from "@firebase/webchannel-wrapper";

const C = "@firebase/firestore";

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Simple wrapper around a nullable UID. Mostly exists to make code more
 * readable.
 */
class x {
    constructor(t) {
        this.uid = t;
    }
    isAuthenticated() {
        return null != this.uid;
    }
    /**
     * Returns a key representing this user, suitable for inclusion in a
     * dictionary.
     */    toKey() {
        return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
    }
    isEqual(t) {
        return t.uid === this.uid;
    }
}

/** A user with a null UID. */ x.UNAUTHENTICATED = new x(null), 
// TODO(mikelehen): Look into getting a proper uid-equivalent for
// non-FirebaseAuth providers.
x.GOOGLE_CREDENTIALS = new x("google-credentials-uid"), x.FIRST_PARTY = new x("first-party-uid"), 
x.MOCK_USER = new x("mock-user");

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let N = "9.6.11";

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const k = new o("@firebase/firestore");

// Helper methods are needed because variables can't be exported as read/write
function M() {
    return k.logLevel;
}

/**
 * Sets the verbosity of Cloud Firestore logs (debug, error, or silent).
 *
 * @param logLevel - The verbosity you set for activity and error logging. Can
 *   be any of the following values:
 *
 *   <ul>
 *     <li>`debug` for the most verbose logging level, primarily for
 *     debugging.</li>
 *     <li>`error` to log errors only.</li>
 *     <li><code>`silent` to turn off logging.</li>
 *   </ul>
 */ function O(t) {
    k.setLogLevel(t);
}

function F(t, ...e) {
    if (k.logLevel <= u.DEBUG) {
        const n = e.map(L);
        k.debug(`Firestore (${N}): ${t}`, ...n);
    }
}

function $(t, ...e) {
    if (k.logLevel <= u.ERROR) {
        const n = e.map(L);
        k.error(`Firestore (${N}): ${t}`, ...n);
    }
}

/**
 * @internal
 */ function B(t, ...e) {
    if (k.logLevel <= u.WARN) {
        const n = e.map(L);
        k.warn(`Firestore (${N}): ${t}`, ...n);
    }
}

/**
 * Converts an additional log parameter to a string representation.
 */ function L(t) {
    if ("string" == typeof t) return t;
    try {
        return e = t, JSON.stringify(e);
    } catch (e) {
        // Converting to JSON failed, just log the object directly
        return t;
    }
    /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
    /** Formats an object as a JSON string, suitable for logging. */
    var e;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Unconditionally fails, throwing an Error with the given message.
 * Messages are stripped in production builds.
 *
 * Returns `never` and can be used in expressions:
 * @example
 * let futureVar = fail('not implemented yet');
 */ function U(t = "Unexpected state") {
    // Log the failure in addition to throw an exception, just in case the
    // exception is swallowed.
    const e = `FIRESTORE (${N}) INTERNAL ASSERTION FAILED: ` + t;
    // NOTE: We don't use FirestoreError here because these are internal failures
    // that cannot be handled by the user. (Also it would create a circular
    // dependency between the error and assert modules which doesn't work.)
    throw $(e), new Error(e);
}

/**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 *
 * Messages are stripped in production builds.
 */ function q(t, e) {
    t || U();
}

/**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 *
 * The code of callsites invoking this function are stripped out in production
 * builds. Any side-effects of code within the debugAssert() invocation will not
 * happen in this case.
 *
 * @internal
 */ function K(t, e) {
    t || U();
}

/**
 * Casts `obj` to `T`. In non-production builds, verifies that `obj` is an
 * instance of `T` before casting.
 */ function G(t, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
e) {
    return t;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Q = {
    // Causes are copied from:
    // https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
    /** Not an error; returned on success. */
    OK: "ok",
    /** The operation was cancelled (typically by the caller). */
    CANCELLED: "cancelled",
    /** Unknown error or an error from a different error domain. */
    UNKNOWN: "unknown",
    /**
     * Client specified an invalid argument. Note that this differs from
     * FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are
     * problematic regardless of the state of the system (e.g., a malformed file
     * name).
     */
    INVALID_ARGUMENT: "invalid-argument",
    /**
     * Deadline expired before operation could complete. For operations that
     * change the state of the system, this error may be returned even if the
     * operation has completed successfully. For example, a successful response
     * from a server could have been delayed long enough for the deadline to
     * expire.
     */
    DEADLINE_EXCEEDED: "deadline-exceeded",
    /** Some requested entity (e.g., file or directory) was not found. */
    NOT_FOUND: "not-found",
    /**
     * Some entity that we attempted to create (e.g., file or directory) already
     * exists.
     */
    ALREADY_EXISTS: "already-exists",
    /**
     * The caller does not have permission to execute the specified operation.
     * PERMISSION_DENIED must not be used for rejections caused by exhausting
     * some resource (use RESOURCE_EXHAUSTED instead for those errors).
     * PERMISSION_DENIED must not be used if the caller can not be identified
     * (use UNAUTHENTICATED instead for those errors).
     */
    PERMISSION_DENIED: "permission-denied",
    /**
     * The request does not have valid authentication credentials for the
     * operation.
     */
    UNAUTHENTICATED: "unauthenticated",
    /**
     * Some resource has been exhausted, perhaps a per-user quota, or perhaps the
     * entire file system is out of space.
     */
    RESOURCE_EXHAUSTED: "resource-exhausted",
    /**
     * Operation was rejected because the system is not in a state required for
     * the operation's execution. For example, directory to be deleted may be
     * non-empty, an rmdir operation is applied to a non-directory, etc.
     *
     * A litmus test that may help a service implementor in deciding
     * between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE:
     *  (a) Use UNAVAILABLE if the client can retry just the failing call.
     *  (b) Use ABORTED if the client should retry at a higher-level
     *      (e.g., restarting a read-modify-write sequence).
     *  (c) Use FAILED_PRECONDITION if the client should not retry until
     *      the system state has been explicitly fixed. E.g., if an "rmdir"
     *      fails because the directory is non-empty, FAILED_PRECONDITION
     *      should be returned since the client should not retry unless
     *      they have first fixed up the directory by deleting files from it.
     *  (d) Use FAILED_PRECONDITION if the client performs conditional
     *      REST Get/Update/Delete on a resource and the resource on the
     *      server does not match the condition. E.g., conflicting
     *      read-modify-write on the same resource.
     */
    FAILED_PRECONDITION: "failed-precondition",
    /**
     * The operation was aborted, typically due to a concurrency issue like
     * sequencer check failures, transaction aborts, etc.
     *
     * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
     * and UNAVAILABLE.
     */
    ABORTED: "aborted",
    /**
     * Operation was attempted past the valid range. E.g., seeking or reading
     * past end of file.
     *
     * Unlike INVALID_ARGUMENT, this error indicates a problem that may be fixed
     * if the system state changes. For example, a 32-bit file system will
     * generate INVALID_ARGUMENT if asked to read at an offset that is not in the
     * range [0,2^32-1], but it will generate OUT_OF_RANGE if asked to read from
     * an offset past the current file size.
     *
     * There is a fair bit of overlap between FAILED_PRECONDITION and
     * OUT_OF_RANGE. We recommend using OUT_OF_RANGE (the more specific error)
     * when it applies so that callers who are iterating through a space can
     * easily look for an OUT_OF_RANGE error to detect when they are done.
     */
    OUT_OF_RANGE: "out-of-range",
    /** Operation is not implemented or not supported/enabled in this service. */
    UNIMPLEMENTED: "unimplemented",
    /**
     * Internal errors. Means some invariants expected by underlying System has
     * been broken. If you see one of these errors, Something is very broken.
     */
    INTERNAL: "internal",
    /**
     * The service is currently unavailable. This is a most likely a transient
     * condition and may be corrected by retrying with a backoff.
     *
     * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
     * and UNAVAILABLE.
     */
    UNAVAILABLE: "unavailable",
    /** Unrecoverable data loss or corruption. */
    DATA_LOSS: "data-loss"
};

/** An error returned by a Firestore operation. */ class j extends a {
    /** @hideconstructor */
    constructor(
    /**
     * The backend error code associated with this error.
     */
    t, 
    /**
     * A custom error description.
     */
    e) {
        super(t, e), this.code = t, this.message = e, 
        // HACK: We write a toString property directly because Error is not a real
        // class and so inheritance does not work correctly. We could alternatively
        // do the same "back-door inheritance" trick that FirebaseError does.
        this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class W {
    constructor() {
        this.promise = new Promise(((t, e) => {
            this.resolve = t, this.reject = e;
        }));
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class z {
    constructor(t, e) {
        this.user = e, this.type = "OAuth", this.headers = new Map, this.headers.set("Authorization", `Bearer ${t}`);
    }
}

/**
 * A CredentialsProvider that always yields an empty token.
 * @internal
 */ class H {
    getToken() {
        return Promise.resolve(null);
    }
    invalidateToken() {}
    start(t, e) {
        // Fire with initial user.
        t.enqueueRetryable((() => e(x.UNAUTHENTICATED)));
    }
    shutdown() {}
}

/**
 * A CredentialsProvider that always returns a constant token. Used for
 * emulator token mocking.
 */ class J {
    constructor(t) {
        this.token = t, 
        /**
         * Stores the listener registered with setChangeListener()
         * This isn't actually necessary since the UID never changes, but we use this
         * to verify the listen contract is adhered to in tests.
         */
        this.changeListener = null;
    }
    getToken() {
        return Promise.resolve(this.token);
    }
    invalidateToken() {}
    start(t, e) {
        this.changeListener = e, 
        // Fire with initial user.
        t.enqueueRetryable((() => e(this.token.user)));
    }
    shutdown() {
        this.changeListener = null;
    }
}

class Y {
    constructor(t) {
        this.t = t, 
        /** Tracks the current User. */
        this.currentUser = x.UNAUTHENTICATED, 
        /**
         * Counter used to detect if the token changed while a getToken request was
         * outstanding.
         */
        this.i = 0, this.forceRefresh = !1, this.auth = null;
    }
    start(t, e) {
        let n = this.i;
        // A change listener that prevents double-firing for the same token change.
                const s = t => this.i !== n ? (n = this.i, e(t)) : Promise.resolve();
        // A promise that can be waited on to block on the next token change.
        // This promise is re-created after each change.
                let i = new W;
        this.o = () => {
            this.i++, this.currentUser = this.u(), i.resolve(), i = new W, t.enqueueRetryable((() => s(this.currentUser)));
        };
        const r = () => {
            const e = i;
            t.enqueueRetryable((async () => {
                await e.promise, await s(this.currentUser);
            }));
        }, o = t => {
            F("FirebaseAuthCredentialsProvider", "Auth detected"), this.auth = t, this.auth.addAuthTokenListener(this.o), 
            r();
        };
        this.t.onInit((t => o(t))), 
        // Our users can initialize Auth right after Firestore, so we give it
        // a chance to register itself with the component framework before we
        // determine whether to start up in unauthenticated mode.
        setTimeout((() => {
            if (!this.auth) {
                const t = this.t.getImmediate({
                    optional: !0
                });
                t ? o(t) : (
                // If auth is still not available, proceed with `null` user
                F("FirebaseAuthCredentialsProvider", "Auth not yet detected"), i.resolve(), i = new W);
            }
        }), 0), r();
    }
    getToken() {
        // Take note of the current value of the tokenCounter so that this method
        // can fail (with an ABORTED error) if there is a token change while the
        // request is outstanding.
        const t = this.i, e = this.forceRefresh;
        return this.forceRefresh = !1, this.auth ? this.auth.getToken(e).then((e => 
        // Cancel the request since the token changed while the request was
        // outstanding so the response is potentially for a previous user (which
        // user, we can't be sure).
        this.i !== t ? (F("FirebaseAuthCredentialsProvider", "getToken aborted due to token change."), 
        this.getToken()) : e ? (q("string" == typeof e.accessToken), new z(e.accessToken, this.currentUser)) : null)) : Promise.resolve(null);
    }
    invalidateToken() {
        this.forceRefresh = !0;
    }
    shutdown() {
        this.auth && this.auth.removeAuthTokenListener(this.o);
    }
    // Auth.getUid() can return null even with a user logged in. It is because
    // getUid() is synchronous, but the auth code populating Uid is asynchronous.
    // This method should only be called in the AuthTokenListener callback
    // to guarantee to get the actual user.
    u() {
        const t = this.auth && this.auth.getUid();
        return q(null === t || "string" == typeof t), new x(t);
    }
}

/*
 * FirstPartyToken provides a fresh token each time its value
 * is requested, because if the token is too old, requests will be rejected.
 * Technically this may no longer be necessary since the SDK should gracefully
 * recover from unauthenticated errors (see b/33147818 for context), but it's
 * safer to keep the implementation as-is.
 */ class X {
    constructor(t, e, n) {
        this.type = "FirstParty", this.user = x.FIRST_PARTY, this.headers = new Map, this.headers.set("X-Goog-AuthUser", e);
        const s = t.auth.getAuthHeaderValueForFirstParty([]);
        s && this.headers.set("Authorization", s), n && this.headers.set("X-Goog-Iam-Authorization-Token", n);
    }
}

/*
 * Provides user credentials required for the Firestore JavaScript SDK
 * to authenticate the user, using technique that is only available
 * to applications hosted by Google.
 */ class Z {
    constructor(t, e, n) {
        this.h = t, this.l = e, this.m = n;
    }
    getToken() {
        return Promise.resolve(new X(this.h, this.l, this.m));
    }
    start(t, e) {
        // Fire with initial uid.
        t.enqueueRetryable((() => e(x.FIRST_PARTY)));
    }
    shutdown() {}
    invalidateToken() {}
}

class tt {
    constructor(t) {
        this.value = t, this.type = "AppCheck", this.headers = new Map, t && t.length > 0 && this.headers.set("x-firebase-appcheck", this.value);
    }
}

class et {
    constructor(t) {
        this.g = t, this.forceRefresh = !1, this.appCheck = null, this.p = null;
    }
    start(t, e) {
        const n = t => {
            null != t.error && F("FirebaseAppCheckTokenProvider", `Error getting App Check token; using placeholder token instead. Error: ${t.error.message}`);
            const n = t.token !== this.p;
            return this.p = t.token, F("FirebaseAppCheckTokenProvider", `Received ${n ? "new" : "existing"} token.`), 
            n ? e(t.token) : Promise.resolve();
        };
        this.o = e => {
            t.enqueueRetryable((() => n(e)));
        };
        const s = t => {
            F("FirebaseAppCheckTokenProvider", "AppCheck detected"), this.appCheck = t, this.appCheck.addTokenListener(this.o);
        };
        this.g.onInit((t => s(t))), 
        // Our users can initialize AppCheck after Firestore, so we give it
        // a chance to register itself with the component framework.
        setTimeout((() => {
            if (!this.appCheck) {
                const t = this.g.getImmediate({
                    optional: !0
                });
                t ? s(t) : 
                // If AppCheck is still not available, proceed without it.
                F("FirebaseAppCheckTokenProvider", "AppCheck not yet detected");
            }
        }), 0);
    }
    getToken() {
        const t = this.forceRefresh;
        return this.forceRefresh = !1, this.appCheck ? this.appCheck.getToken(t).then((t => t ? (q("string" == typeof t.token), 
        this.p = t.token, new tt(t.token)) : null)) : Promise.resolve(null);
    }
    invalidateToken() {
        this.forceRefresh = !0;
    }
    shutdown() {
        this.appCheck && this.appCheck.removeTokenListener(this.o);
    }
}

/**
 * An AppCheck token provider that always yields an empty token.
 * @internal
 */ class nt {
    getToken() {
        return Promise.resolve(new tt(""));
    }
    invalidateToken() {}
    start(t, e) {}
    shutdown() {}
}

/**
 * Builds a CredentialsProvider depending on the type of
 * the credentials passed in.
 */
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * `ListenSequence` is a monotonic sequence. It is initialized with a minimum value to
 * exceed. All subsequent calls to next will return increasing values. If provided with a
 * `SequenceNumberSyncer`, it will additionally bump its next value when told of a new value, as
 * well as write out sequence numbers that it produces via `next()`.
 */
class st {
    constructor(t, e) {
        this.previousValue = t, e && (e.sequenceNumberHandler = t => this.I(t), this.T = t => e.writeSequenceNumber(t));
    }
    I(t) {
        return this.previousValue = Math.max(t, this.previousValue), this.previousValue;
    }
    next() {
        const t = ++this.previousValue;
        return this.T && this.T(t), t;
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Generates `nBytes` of random bytes.
 *
 * If `nBytes < 0` , an error will be thrown.
 */
function it(t) {
    // Polyfills for IE and WebWorker by using `self` and `msCrypto` when `crypto` is not available.
    const e = 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "undefined" != typeof self && (self.crypto || self.msCrypto), n = new Uint8Array(t);
    if (e && "function" == typeof e.getRandomValues) e.getRandomValues(n); else 
    // Falls back to Math.random
    for (let e = 0; e < t; e++) n[e] = Math.floor(256 * Math.random());
    return n;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ st.A = -1;

class rt {
    static R() {
        // Alphanumeric characters
        const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", e = Math.floor(256 / t.length) * t.length;
        // The largest byte value that is a multiple of `char.length`.
                let n = "";
        for (;n.length < 20; ) {
            const s = it(40);
            for (let i = 0; i < s.length; ++i) 
            // Only accept values that are [0, maxMultiple), this ensures they can
            // be evenly mapped to indices of `chars` via a modulo operation.
            n.length < 20 && s[i] < e && (n += t.charAt(s[i] % t.length));
        }
        return n;
    }
}

function ot(t, e) {
    return t < e ? -1 : t > e ? 1 : 0;
}

/** Helper to compare arrays using isEqual(). */ function ut(t, e, n) {
    return t.length === e.length && t.every(((t, s) => n(t, e[s])));
}

/**
 * Returns the immediate lexicographically-following string. This is useful to
 * construct an inclusive range for indexeddb iterators.
 */ function at(t) {
    // Return the input string, with an additional NUL byte appended.
    return t + "\0";
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// The earliest date supported by Firestore timestamps (0001-01-01T00:00:00Z).
/**
 * A `Timestamp` represents a point in time independent of any time zone or
 * calendar, represented as seconds and fractions of seconds at nanosecond
 * resolution in UTC Epoch time.
 *
 * It is encoded using the Proleptic Gregorian Calendar which extends the
 * Gregorian calendar backwards to year one. It is encoded assuming all minutes
 * are 60 seconds long, i.e. leap seconds are "smeared" so that no leap second
 * table is needed for interpretation. Range is from 0001-01-01T00:00:00Z to
 * 9999-12-31T23:59:59.999999999Z.
 *
 * For examples and further specifications, refer to the
 * {@link https://github.com/google/protobuf/blob/master/src/google/protobuf/timestamp.proto | Timestamp definition}.
 */
class ct {
    /**
     * Creates a new timestamp.
     *
     * @param seconds - The number of seconds of UTC time since Unix epoch
     *     1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
     *     9999-12-31T23:59:59Z inclusive.
     * @param nanoseconds - The non-negative fractions of a second at nanosecond
     *     resolution. Negative second values with fractions must still have
     *     non-negative nanoseconds values that count forward in time. Must be
     *     from 0 to 999,999,999 inclusive.
     */
    constructor(
    /**
     * The number of seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z.
     */
    t, 
    /**
     * The fractions of a second at nanosecond resolution.*
     */
    e) {
        if (this.seconds = t, this.nanoseconds = e, e < 0) throw new j(Q.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (e >= 1e9) throw new j(Q.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (t < -62135596800) throw new j(Q.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
        // This will break in the year 10,000.
                if (t >= 253402300800) throw new j(Q.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
    }
    /**
     * Creates a new timestamp with the current date, with millisecond precision.
     *
     * @returns a new timestamp representing the current date.
     */    static now() {
        return ct.fromMillis(Date.now());
    }
    /**
     * Creates a new timestamp from the given date.
     *
     * @param date - The date to initialize the `Timestamp` from.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     date.
     */    static fromDate(t) {
        return ct.fromMillis(t.getTime());
    }
    /**
     * Creates a new timestamp from the given number of milliseconds.
     *
     * @param milliseconds - Number of milliseconds since Unix epoch
     *     1970-01-01T00:00:00Z.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     number of milliseconds.
     */    static fromMillis(t) {
        const e = Math.floor(t / 1e3), n = Math.floor(1e6 * (t - 1e3 * e));
        return new ct(e, n);
    }
    /**
     * Converts a `Timestamp` to a JavaScript `Date` object. This conversion
     * causes a loss of precision since `Date` objects only support millisecond
     * precision.
     *
     * @returns JavaScript `Date` object representing the same point in time as
     *     this `Timestamp`, with millisecond precision.
     */    toDate() {
        return new Date(this.toMillis());
    }
    /**
     * Converts a `Timestamp` to a numeric timestamp (in milliseconds since
     * epoch). This operation causes a loss of precision.
     *
     * @returns The point in time corresponding to this timestamp, represented as
     *     the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
     */    toMillis() {
        return 1e3 * this.seconds + this.nanoseconds / 1e6;
    }
    _compareTo(t) {
        return this.seconds === t.seconds ? ot(this.nanoseconds, t.nanoseconds) : ot(this.seconds, t.seconds);
    }
    /**
     * Returns true if this `Timestamp` is equal to the provided one.
     *
     * @param other - The `Timestamp` to compare against.
     * @returns true if this `Timestamp` is equal to the provided one.
     */    isEqual(t) {
        return t.seconds === this.seconds && t.nanoseconds === this.nanoseconds;
    }
    /** Returns a textual representation of this `Timestamp`. */    toString() {
        return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
    }
    /** Returns a JSON-serializable representation of this `Timestamp`. */    toJSON() {
        return {
            seconds: this.seconds,
            nanoseconds: this.nanoseconds
        };
    }
    /**
     * Converts this object to a primitive string, which allows `Timestamp` objects
     * to be compared using the `>`, `<=`, `>=` and `>` operators.
     */    valueOf() {
        // This method returns a string of the form <seconds>.<nanoseconds> where
        // <seconds> is translated to have a non-negative value and both <seconds>
        // and <nanoseconds> are left-padded with zeroes to be a consistent length.
        // Strings with this format then have a lexiographical ordering that matches
        // the expected ordering. The <seconds> translation is done to avoid having
        // a leading negative sign (i.e. a leading '-' character) in its string
        // representation, which would affect its lexiographical ordering.
        const t = this.seconds - -62135596800;
        // Note: Up to 12 decimal digits are required to represent all valid
        // 'seconds' values.
                return String(t).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0");
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A version of a document in Firestore. This corresponds to the version
 * timestamp, such as update_time or read_time.
 */ class ht {
    constructor(t) {
        this.timestamp = t;
    }
    static fromTimestamp(t) {
        return new ht(t);
    }
    static min() {
        return new ht(new ct(0, 0));
    }
    static max() {
        return new ht(new ct(253402300799, 999999999));
    }
    compareTo(t) {
        return this.timestamp._compareTo(t.timestamp);
    }
    isEqual(t) {
        return this.timestamp.isEqual(t.timestamp);
    }
    /** Returns a number representation of the version for use in spec tests. */    toMicroseconds() {
        // Convert to microseconds.
        return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
    }
    toString() {
        return "SnapshotVersion(" + this.timestamp.toString() + ")";
    }
    toTimestamp() {
        return this.timestamp;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function lt(t) {
    let e = 0;
    for (const n in t) Object.prototype.hasOwnProperty.call(t, n) && e++;
    return e;
}

function ft(t, e) {
    for (const n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n]);
}

function dt(t) {
    for (const e in t) if (Object.prototype.hasOwnProperty.call(t, e)) return !1;
    return !0;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Path represents an ordered sequence of string segments.
 */
class _t {
    constructor(t, e, n) {
        void 0 === e ? e = 0 : e > t.length && U(), void 0 === n ? n = t.length - e : n > t.length - e && U(), 
        this.segments = t, this.offset = e, this.len = n;
    }
    get length() {
        return this.len;
    }
    isEqual(t) {
        return 0 === _t.comparator(this, t);
    }
    child(t) {
        const e = this.segments.slice(this.offset, this.limit());
        return t instanceof _t ? t.forEach((t => {
            e.push(t);
        })) : e.push(t), this.construct(e);
    }
    /** The index of one past the last segment of the path. */    limit() {
        return this.offset + this.length;
    }
    popFirst(t) {
        return t = void 0 === t ? 1 : t, this.construct(this.segments, this.offset + t, this.length - t);
    }
    popLast() {
        return this.construct(this.segments, this.offset, this.length - 1);
    }
    firstSegment() {
        return this.segments[this.offset];
    }
    lastSegment() {
        return this.get(this.length - 1);
    }
    get(t) {
        return this.segments[this.offset + t];
    }
    isEmpty() {
        return 0 === this.length;
    }
    isPrefixOf(t) {
        if (t.length < this.length) return !1;
        for (let e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
        return !0;
    }
    isImmediateParentOf(t) {
        if (this.length + 1 !== t.length) return !1;
        for (let e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
        return !0;
    }
    forEach(t) {
        for (let e = this.offset, n = this.limit(); e < n; e++) t(this.segments[e]);
    }
    toArray() {
        return this.segments.slice(this.offset, this.limit());
    }
    static comparator(t, e) {
        const n = Math.min(t.length, e.length);
        for (let s = 0; s < n; s++) {
            const n = t.get(s), i = e.get(s);
            if (n < i) return -1;
            if (n > i) return 1;
        }
        return t.length < e.length ? -1 : t.length > e.length ? 1 : 0;
    }
}

/**
 * A slash-separated path for navigating resources (documents and collections)
 * within Firestore.
 *
 * @internal
 */ class wt extends _t {
    construct(t, e, n) {
        return new wt(t, e, n);
    }
    canonicalString() {
        // NOTE: The client is ignorant of any path segments containing escape
        // sequences (e.g. __id123__) and just passes them through raw (they exist
        // for legacy reasons and should not be used frequently).
        return this.toArray().join("/");
    }
    toString() {
        return this.canonicalString();
    }
    /**
     * Creates a resource path from the given slash-delimited string. If multiple
     * arguments are provided, all components are combined. Leading and trailing
     * slashes from all components are ignored.
     */    static fromString(...t) {
        // NOTE: The client is ignorant of any path segments containing escape
        // sequences (e.g. __id123__) and just passes them through raw (they exist
        // for legacy reasons and should not be used frequently).
        const e = [];
        for (const n of t) {
            if (n.indexOf("//") >= 0) throw new j(Q.INVALID_ARGUMENT, `Invalid segment (${n}). Paths must not contain // in them.`);
            // Strip leading and traling slashed.
                        e.push(...n.split("/").filter((t => t.length > 0)));
        }
        return new wt(e);
    }
    static emptyPath() {
        return new wt([]);
    }
}

const mt = /^[_a-zA-Z][_a-zA-Z0-9]*$/;

/**
 * A dot-separated path for navigating sub-objects within a document.
 * @internal
 */ class gt extends _t {
    construct(t, e, n) {
        return new gt(t, e, n);
    }
    /**
     * Returns true if the string could be used as a segment in a field path
     * without escaping.
     */    static isValidIdentifier(t) {
        return mt.test(t);
    }
    canonicalString() {
        return this.toArray().map((t => (t = t.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), 
        gt.isValidIdentifier(t) || (t = "`" + t + "`"), t))).join(".");
    }
    toString() {
        return this.canonicalString();
    }
    /**
     * Returns true if this field references the key of a document.
     */    isKeyField() {
        return 1 === this.length && "__name__" === this.get(0);
    }
    /**
     * The field designating the key of a document.
     */    static keyField() {
        return new gt([ "__name__" ]);
    }
    /**
     * Parses a field string from the given server-formatted string.
     *
     * - Splitting the empty string is not allowed (for now at least).
     * - Empty segments within the string (e.g. if there are two consecutive
     *   separators) are not allowed.
     *
     * TODO(b/37244157): we should make this more strict. Right now, it allows
     * non-identifier path components, even if they aren't escaped.
     */    static fromServerFormat(t) {
        const e = [];
        let n = "", s = 0;
        const i = () => {
            if (0 === n.length) throw new j(Q.INVALID_ARGUMENT, `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
            e.push(n), n = "";
        };
        let r = !1;
        for (;s < t.length; ) {
            const e = t[s];
            if ("\\" === e) {
                if (s + 1 === t.length) throw new j(Q.INVALID_ARGUMENT, "Path has trailing escape character: " + t);
                const e = t[s + 1];
                if ("\\" !== e && "." !== e && "`" !== e) throw new j(Q.INVALID_ARGUMENT, "Path has invalid escape sequence: " + t);
                n += e, s += 2;
            } else "`" === e ? (r = !r, s++) : "." !== e || r ? (n += e, s++) : (i(), s++);
        }
        if (i(), r) throw new j(Q.INVALID_ARGUMENT, "Unterminated ` in path: " + t);
        return new gt(e);
    }
    static emptyPath() {
        return new gt([]);
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provides a set of fields that can be used to partially patch a document.
 * FieldMask is used in conjunction with ObjectValue.
 * Examples:
 *   foo - Overwrites foo entirely with the provided value. If foo is not
 *         present in the companion ObjectValue, the field is deleted.
 *   foo.bar - Overwrites only the field bar of the object foo.
 *             If foo is not an object, foo is replaced with an object
 *             containing foo
 */ class yt {
    constructor(t) {
        this.fields = t, 
        // TODO(dimond): validation of FieldMask
        // Sort the field mask to support `FieldMask.isEqual()` and assert below.
        t.sort(gt.comparator);
    }
    /**
     * Verifies that `fieldPath` is included by at least one field in this field
     * mask.
     *
     * This is an O(n) operation, where `n` is the size of the field mask.
     */    covers(t) {
        for (const e of this.fields) if (e.isPrefixOf(t)) return !0;
        return !1;
    }
    isEqual(t) {
        return ut(this.fields, t.fields, ((t, e) => t.isEqual(e)));
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// WebSafe uses a different URL-encoding safe alphabet that doesn't match
// the encoding used on the backend.
/** Converts a Base64 encoded string to a binary string. */
function pt(t) {
    return String.fromCharCode.apply(null, 
    // We use `decodeStringToByteArray()` instead of `decodeString()` since
    // `decodeString()` returns Unicode strings, which doesn't match the values
    // returned by `atob()`'s Latin1 representation.
    c.decodeStringToByteArray(t, false));
}

/** Converts a binary string to a Base64 encoded string. */
/** True if and only if the Base64 conversion functions are available. */
function It() {
    return !0;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Immutable class that represents a "proto" byte string.
 *
 * Proto byte strings can either be Base64-encoded strings or Uint8Arrays when
 * sent on the wire. This class abstracts away this differentiation by holding
 * the proto byte string in a common class that must be converted into a string
 * before being sent as a proto.
 * @internal
 */ class Tt {
    constructor(t) {
        this.binaryString = t;
    }
    static fromBase64String(t) {
        const e = pt(t);
        return new Tt(e);
    }
    static fromUint8Array(t) {
        // TODO(indexing); Remove the copy of the byte string here as this method
        // is frequently called during indexing.
        const e = 
        /**
 * Helper function to convert an Uint8array to a binary string.
 */
        function(t) {
            let e = "";
            for (let n = 0; n < t.length; ++n) e += String.fromCharCode(t[n]);
            return e;
        }
        /**
 * Helper function to convert a binary string to an Uint8Array.
 */ (t);
        return new Tt(e);
    }
    [Symbol.iterator]() {
        let t = 0;
        return {
            next: () => t < this.binaryString.length ? {
                value: this.binaryString.charCodeAt(t++),
                done: !1
            } : {
                value: void 0,
                done: !0
            }
        };
    }
    toBase64() {
        return function(t) {
            const e = [];
            for (let n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);
            return c.encodeByteArray(e, !1);
        }(this.binaryString);
    }
    toUint8Array() {
        return function(t) {
            const e = new Uint8Array(t.length);
            for (let n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);
            return e;
        }
        /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
        // A RegExp matching ISO 8601 UTC timestamps with optional fraction.
        (this.binaryString);
    }
    approximateByteSize() {
        return 2 * this.binaryString.length;
    }
    compareTo(t) {
        return ot(this.binaryString, t.binaryString);
    }
    isEqual(t) {
        return this.binaryString === t.binaryString;
    }
}

Tt.EMPTY_BYTE_STRING = new Tt("");

const Et = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

/**
 * Converts the possible Proto values for a timestamp value into a "seconds and
 * nanos" representation.
 */ function At(t) {
    // The json interface (for the browser) will return an iso timestamp string,
    // while the proto js library (for node) will return a
    // google.protobuf.Timestamp instance.
    if (q(!!t), "string" == typeof t) {
        // The date string can have higher precision (nanos) than the Date class
        // (millis), so we do some custom parsing here.
        // Parse the nanos right out of the string.
        let e = 0;
        const n = Et.exec(t);
        if (q(!!n), n[1]) {
            // Pad the fraction out to 9 digits (nanos).
            let t = n[1];
            t = (t + "000000000").substr(0, 9), e = Number(t);
        }
        // Parse the date to get the seconds.
                const s = new Date(t);
        return {
            seconds: Math.floor(s.getTime() / 1e3),
            nanos: e
        };
    }
    return {
        seconds: Rt(t.seconds),
        nanos: Rt(t.nanos)
    };
}

/**
 * Converts the possible Proto types for numbers into a JavaScript number.
 * Returns 0 if the value is not numeric.
 */ function Rt(t) {
    // TODO(bjornick): Handle int64 greater than 53 bits.
    return "number" == typeof t ? t : "string" == typeof t ? Number(t) : 0;
}

/** Converts the possible Proto types for Blobs into a ByteString. */ function Pt(t) {
    return "string" == typeof t ? Tt.fromBase64String(t) : Tt.fromUint8Array(t);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Represents a locally-applied ServerTimestamp.
 *
 * Server Timestamps are backed by MapValues that contain an internal field
 * `__type__` with a value of `server_timestamp`. The previous value and local
 * write time are stored in its `__previous_value__` and `__local_write_time__`
 * fields respectively.
 *
 * Notes:
 * - ServerTimestampValue instances are created as the result of applying a
 *   transform. They can only exist in the local view of a document. Therefore
 *   they do not need to be parsed or serialized.
 * - When evaluated locally (e.g. for snapshot.data()), they by default
 *   evaluate to `null`. This behavior can be configured by passing custom
 *   FieldValueOptions to value().
 * - With respect to other ServerTimestampValues, they sort by their
 *   localWriteTime.
 */ function bt(t) {
    var e, n;
    return "server_timestamp" === (null === (n = ((null === (e = null == t ? void 0 : t.mapValue) || void 0 === e ? void 0 : e.fields) || {}).__type__) || void 0 === n ? void 0 : n.stringValue);
}

/**
 * Creates a new ServerTimestamp proto value (using the internal format).
 */
/**
 * Returns the value of the field before this ServerTimestamp was set.
 *
 * Preserving the previous values allows the user to display the last resoled
 * value until the backend responds with the timestamp.
 */
function Vt(t) {
    const e = t.mapValue.fields.__previous_value__;
    return bt(e) ? Vt(e) : e;
}

/**
 * Returns the local time at which this timestamp was first set.
 */ function vt(t) {
    const e = At(t.mapValue.fields.__local_write_time__.timestampValue);
    return new ct(e.seconds, e.nanos);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class St {
    /**
     * Constructs a DatabaseInfo using the provided host, databaseId and
     * persistenceKey.
     *
     * @param databaseId - The database to use.
     * @param appId - The Firebase App Id.
     * @param persistenceKey - A unique identifier for this Firestore's local
     * storage (used in conjunction with the databaseId).
     * @param host - The Firestore backend host to connect to.
     * @param ssl - Whether to use SSL when connecting.
     * @param forceLongPolling - Whether to use the forceLongPolling option
     * when using WebChannel as the network transport.
     * @param autoDetectLongPolling - Whether to use the detectBufferingProxy
     * option when using WebChannel as the network transport.
     * @param useFetchStreams Whether to use the Fetch API instead of
     * XMLHTTPRequest
     */
    constructor(t, e, n, s, i, r, o, u) {
        this.databaseId = t, this.appId = e, this.persistenceKey = n, this.host = s, this.ssl = i, 
        this.forceLongPolling = r, this.autoDetectLongPolling = o, this.useFetchStreams = u;
    }
}

/** The default database name for a project. */
/**
 * Represents the database ID a Firestore client is associated with.
 * @internal
 */
class Dt {
    constructor(t, e) {
        this.projectId = t, this.database = e || "(default)";
    }
    static empty() {
        return new Dt("", "");
    }
    get isDefaultDatabase() {
        return "(default)" === this.database;
    }
    isEqual(t) {
        return t instanceof Dt && t.projectId === this.projectId && t.database === this.database;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Sentinel value that sorts before any Mutation Batch ID. */
/**
 * Returns whether a variable is either undefined or null.
 */
function Ct(t) {
    return null == t;
}

/** Returns whether the value represents -0. */ function xt(t) {
    // Detect if the value is -0.0. Based on polyfill from
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
    return 0 === t && 1 / t == -1 / 0;
}

/**
 * Returns whether a value is an integer and in the safe integer range
 * @param value - The value to test for being an integer and in the safe range
 */ function Nt(t) {
    return "number" == typeof t && Number.isInteger(t) && !xt(t) && t <= Number.MAX_SAFE_INTEGER && t >= Number.MIN_SAFE_INTEGER;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @internal
 */ class kt {
    constructor(t) {
        this.path = t;
    }
    static fromPath(t) {
        return new kt(wt.fromString(t));
    }
    static fromName(t) {
        return new kt(wt.fromString(t).popFirst(5));
    }
    static empty() {
        return new kt(wt.emptyPath());
    }
    get collectionGroup() {
        return this.path.popLast().lastSegment();
    }
    /** Returns true if the document is in the specified collectionId. */    hasCollectionId(t) {
        return this.path.length >= 2 && this.path.get(this.path.length - 2) === t;
    }
    /** Returns the collection group (i.e. the name of the parent collection) for this key. */    getCollectionGroup() {
        return this.path.get(this.path.length - 2);
    }
    /** Returns the fully qualified path to the parent collection. */    getCollectionPath() {
        return this.path.popLast();
    }
    isEqual(t) {
        return null !== t && 0 === wt.comparator(this.path, t.path);
    }
    toString() {
        return this.path.toString();
    }
    static comparator(t, e) {
        return wt.comparator(t.path, e.path);
    }
    static isDocumentKey(t) {
        return t.length % 2 == 0;
    }
    /**
     * Creates and returns a new document key with the given segments.
     *
     * @param segments - The segments of the path to the document
     * @returns A new instance of DocumentKey
     */    static fromSegments(t) {
        return new kt(new wt(t.slice()));
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Mt = {
    mapValue: {
        fields: {
            __type__: {
                stringValue: "__max__"
            }
        }
    }
}, Ot = {
    nullValue: "NULL_VALUE"
};

/** Extracts the backend's type order for the provided value. */
function Ft(t) {
    return "nullValue" in t ? 0 /* NullValue */ : "booleanValue" in t ? 1 /* BooleanValue */ : "integerValue" in t || "doubleValue" in t ? 2 /* NumberValue */ : "timestampValue" in t ? 3 /* TimestampValue */ : "stringValue" in t ? 5 /* StringValue */ : "bytesValue" in t ? 6 /* BlobValue */ : "referenceValue" in t ? 7 /* RefValue */ : "geoPointValue" in t ? 8 /* GeoPointValue */ : "arrayValue" in t ? 9 /* ArrayValue */ : "mapValue" in t ? bt(t) ? 4 /* ServerTimestampValue */ : Yt(t) ? 9 /* ArrayValue */ : 10 /* ObjectValue */ : U();
}

/** Tests `left` and `right` for equality based on the backend semantics. */ function $t(t, e) {
    if (t === e) return !0;
    const n = Ft(t);
    if (n !== Ft(e)) return !1;
    switch (n) {
      case 0 /* NullValue */ :
      case 9007199254740991 /* MaxValue */ :
        return !0;

      case 1 /* BooleanValue */ :
        return t.booleanValue === e.booleanValue;

      case 4 /* ServerTimestampValue */ :
        return vt(t).isEqual(vt(e));

      case 3 /* TimestampValue */ :
        return function(t, e) {
            if ("string" == typeof t.timestampValue && "string" == typeof e.timestampValue && t.timestampValue.length === e.timestampValue.length) 
            // Use string equality for ISO 8601 timestamps
            return t.timestampValue === e.timestampValue;
            const n = At(t.timestampValue), s = At(e.timestampValue);
            return n.seconds === s.seconds && n.nanos === s.nanos;
        }(t, e);

      case 5 /* StringValue */ :
        return t.stringValue === e.stringValue;

      case 6 /* BlobValue */ :
        return function(t, e) {
            return Pt(t.bytesValue).isEqual(Pt(e.bytesValue));
        }(t, e);

      case 7 /* RefValue */ :
        return t.referenceValue === e.referenceValue;

      case 8 /* GeoPointValue */ :
        return function(t, e) {
            return Rt(t.geoPointValue.latitude) === Rt(e.geoPointValue.latitude) && Rt(t.geoPointValue.longitude) === Rt(e.geoPointValue.longitude);
        }(t, e);

      case 2 /* NumberValue */ :
        return function(t, e) {
            if ("integerValue" in t && "integerValue" in e) return Rt(t.integerValue) === Rt(e.integerValue);
            if ("doubleValue" in t && "doubleValue" in e) {
                const n = Rt(t.doubleValue), s = Rt(e.doubleValue);
                return n === s ? xt(n) === xt(s) : isNaN(n) && isNaN(s);
            }
            return !1;
        }(t, e);

      case 9 /* ArrayValue */ :
        return ut(t.arrayValue.values || [], e.arrayValue.values || [], $t);

      case 10 /* ObjectValue */ :
        return function(t, e) {
            const n = t.mapValue.fields || {}, s = e.mapValue.fields || {};
            if (lt(n) !== lt(s)) return !1;
            for (const t in n) if (n.hasOwnProperty(t) && (void 0 === s[t] || !$t(n[t], s[t]))) return !1;
            return !0;
        }
        /** Returns true if the ArrayValue contains the specified element. */ (t, e);

      default:
        return U();
    }
}

function Bt(t, e) {
    return void 0 !== (t.values || []).find((t => $t(t, e)));
}

function Lt(t, e) {
    if (t === e) return 0;
    const n = Ft(t), s = Ft(e);
    if (n !== s) return ot(n, s);
    switch (n) {
      case 0 /* NullValue */ :
      case 9007199254740991 /* MaxValue */ :
        return 0;

      case 1 /* BooleanValue */ :
        return ot(t.booleanValue, e.booleanValue);

      case 2 /* NumberValue */ :
        return function(t, e) {
            const n = Rt(t.integerValue || t.doubleValue), s = Rt(e.integerValue || e.doubleValue);
            return n < s ? -1 : n > s ? 1 : n === s ? 0 : 
            // one or both are NaN.
            isNaN(n) ? isNaN(s) ? 0 : -1 : 1;
        }(t, e);

      case 3 /* TimestampValue */ :
        return Ut(t.timestampValue, e.timestampValue);

      case 4 /* ServerTimestampValue */ :
        return Ut(vt(t), vt(e));

      case 5 /* StringValue */ :
        return ot(t.stringValue, e.stringValue);

      case 6 /* BlobValue */ :
        return function(t, e) {
            const n = Pt(t), s = Pt(e);
            return n.compareTo(s);
        }(t.bytesValue, e.bytesValue);

      case 7 /* RefValue */ :
        return function(t, e) {
            const n = t.split("/"), s = e.split("/");
            for (let t = 0; t < n.length && t < s.length; t++) {
                const e = ot(n[t], s[t]);
                if (0 !== e) return e;
            }
            return ot(n.length, s.length);
        }(t.referenceValue, e.referenceValue);

      case 8 /* GeoPointValue */ :
        return function(t, e) {
            const n = ot(Rt(t.latitude), Rt(e.latitude));
            if (0 !== n) return n;
            return ot(Rt(t.longitude), Rt(e.longitude));
        }(t.geoPointValue, e.geoPointValue);

      case 9 /* ArrayValue */ :
        return function(t, e) {
            const n = t.values || [], s = e.values || [];
            for (let t = 0; t < n.length && t < s.length; ++t) {
                const e = Lt(n[t], s[t]);
                if (e) return e;
            }
            return ot(n.length, s.length);
        }(t.arrayValue, e.arrayValue);

      case 10 /* ObjectValue */ :
        return function(t, e) {
            const n = t.fields || {}, s = Object.keys(n), i = e.fields || {}, r = Object.keys(i);
            // Even though MapValues are likely sorted correctly based on their insertion
            // order (e.g. when received from the backend), local modifications can bring
            // elements out of order. We need to re-sort the elements to ensure that
            // canonical IDs are independent of insertion order.
            s.sort(), r.sort();
            for (let t = 0; t < s.length && t < r.length; ++t) {
                const e = ot(s[t], r[t]);
                if (0 !== e) return e;
                const o = Lt(n[s[t]], i[r[t]]);
                if (0 !== o) return o;
            }
            return ot(s.length, r.length);
        }
        /**
 * Generates the canonical ID for the provided field value (as used in Target
 * serialization).
 */ (t.mapValue, e.mapValue);

      default:
        throw U();
    }
}

function Ut(t, e) {
    if ("string" == typeof t && "string" == typeof e && t.length === e.length) return ot(t, e);
    const n = At(t), s = At(e), i = ot(n.seconds, s.seconds);
    return 0 !== i ? i : ot(n.nanos, s.nanos);
}

function qt(t) {
    return Kt(t);
}

function Kt(t) {
    return "nullValue" in t ? "null" : "booleanValue" in t ? "" + t.booleanValue : "integerValue" in t ? "" + t.integerValue : "doubleValue" in t ? "" + t.doubleValue : "timestampValue" in t ? function(t) {
        const e = At(t);
        return `time(${e.seconds},${e.nanos})`;
    }(t.timestampValue) : "stringValue" in t ? t.stringValue : "bytesValue" in t ? Pt(t.bytesValue).toBase64() : "referenceValue" in t ? (n = t.referenceValue, 
    kt.fromName(n).toString()) : "geoPointValue" in t ? `geo(${(e = t.geoPointValue).latitude},${e.longitude})` : "arrayValue" in t ? function(t) {
        let e = "[", n = !0;
        for (const s of t.values || []) n ? n = !1 : e += ",", e += Kt(s);
        return e + "]";
    }
    /** Returns a reference value for the provided database and key. */ (t.arrayValue) : "mapValue" in t ? function(t) {
        // Iteration order in JavaScript is not guaranteed. To ensure that we generate
        // matching canonical IDs for identical maps, we need to sort the keys.
        const e = Object.keys(t.fields || {}).sort();
        let n = "{", s = !0;
        for (const i of e) s ? s = !1 : n += ",", n += `${i}:${Kt(t.fields[i])}`;
        return n + "}";
    }(t.mapValue) : U();
    var e, n;
}

function Gt(t, e) {
    return {
        referenceValue: `projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`
    };
}

/** Returns true if `value` is an IntegerValue . */ function Qt(t) {
    return !!t && "integerValue" in t;
}

/** Returns true if `value` is a DoubleValue. */
/** Returns true if `value` is an ArrayValue. */
function jt(t) {
    return !!t && "arrayValue" in t;
}

/** Returns true if `value` is a NullValue. */ function Wt(t) {
    return !!t && "nullValue" in t;
}

/** Returns true if `value` is NaN. */ function zt(t) {
    return !!t && "doubleValue" in t && isNaN(Number(t.doubleValue));
}

/** Returns true if `value` is a MapValue. */ function Ht(t) {
    return !!t && "mapValue" in t;
}

/** Creates a deep copy of `source`. */ function Jt(t) {
    if (t.geoPointValue) return {
        geoPointValue: Object.assign({}, t.geoPointValue)
    };
    if (t.timestampValue && "object" == typeof t.timestampValue) return {
        timestampValue: Object.assign({}, t.timestampValue)
    };
    if (t.mapValue) {
        const e = {
            mapValue: {
                fields: {}
            }
        };
        return ft(t.mapValue.fields, ((t, n) => e.mapValue.fields[t] = Jt(n))), e;
    }
    if (t.arrayValue) {
        const e = {
            arrayValue: {
                values: []
            }
        };
        for (let n = 0; n < (t.arrayValue.values || []).length; ++n) e.arrayValue.values[n] = Jt(t.arrayValue.values[n]);
        return e;
    }
    return Object.assign({}, t);
}

/** Returns true if the Value represents the canonical {@link #MAX_VALUE} . */ function Yt(t) {
    return "__max__" === (((t.mapValue || {}).fields || {}).__type__ || {}).stringValue;
}

/** Returns the lowest value for the given value type (inclusive). */ function Xt(t) {
    return "nullValue" in t ? Ot : "booleanValue" in t ? {
        booleanValue: !1
    } : "integerValue" in t || "doubleValue" in t ? {
        doubleValue: NaN
    } : "timestampValue" in t ? {
        timestampValue: {
            seconds: Number.MIN_SAFE_INTEGER
        }
    } : "stringValue" in t ? {
        stringValue: ""
    } : "bytesValue" in t ? {
        bytesValue: ""
    } : "referenceValue" in t ? Gt(Dt.empty(), kt.empty()) : "geoPointValue" in t ? {
        geoPointValue: {
            latitude: -90,
            longitude: -180
        }
    } : "arrayValue" in t ? {
        arrayValue: {}
    } : "mapValue" in t ? {
        mapValue: {}
    } : U();
}

/** Returns the largest value for the given value type (exclusive). */ function Zt(t) {
    return "nullValue" in t ? {
        booleanValue: !1
    } : "booleanValue" in t ? {
        doubleValue: NaN
    } : "integerValue" in t || "doubleValue" in t ? {
        timestampValue: {
            seconds: Number.MIN_SAFE_INTEGER
        }
    } : "timestampValue" in t ? {
        stringValue: ""
    } : "stringValue" in t ? {
        bytesValue: ""
    } : "bytesValue" in t ? Gt(Dt.empty(), kt.empty()) : "referenceValue" in t ? {
        geoPointValue: {
            latitude: -90,
            longitude: -180
        }
    } : "geoPointValue" in t ? {
        arrayValue: {}
    } : "arrayValue" in t ? {
        mapValue: {}
    } : "mapValue" in t ? Mt : U();
}

function te(t, e) {
    return void 0 === t ? e : void 0 === e || Lt(t, e) > 0 ? t : e;
}

function ee(t, e) {
    return void 0 === t ? e : void 0 === e || Lt(t, e) < 0 ? t : e;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An ObjectValue represents a MapValue in the Firestore Proto and offers the
 * ability to add and remove fields (via the ObjectValueBuilder).
 */ class ne {
    constructor(t) {
        this.value = t;
    }
    static empty() {
        return new ne({
            mapValue: {}
        });
    }
    /**
     * Returns the value at the given path or null.
     *
     * @param path - the path to search
     * @returns The value at the path or null if the path is not set.
     */    field(t) {
        if (t.isEmpty()) return this.value;
        {
            let e = this.value;
            for (let n = 0; n < t.length - 1; ++n) if (e = (e.mapValue.fields || {})[t.get(n)], 
            !Ht(e)) return null;
            return e = (e.mapValue.fields || {})[t.lastSegment()], e || null;
        }
    }
    /**
     * Sets the field to the provided value.
     *
     * @param path - The field path to set.
     * @param value - The value to set.
     */    set(t, e) {
        this.getFieldsMap(t.popLast())[t.lastSegment()] = Jt(e);
    }
    /**
     * Sets the provided fields to the provided values.
     *
     * @param data - A map of fields to values (or null for deletes).
     */    setAll(t) {
        let e = gt.emptyPath(), n = {}, s = [];
        t.forEach(((t, i) => {
            if (!e.isImmediateParentOf(i)) {
                // Insert the accumulated changes at this parent location
                const t = this.getFieldsMap(e);
                this.applyChanges(t, n, s), n = {}, s = [], e = i.popLast();
            }
            t ? n[i.lastSegment()] = Jt(t) : s.push(i.lastSegment());
        }));
        const i = this.getFieldsMap(e);
        this.applyChanges(i, n, s);
    }
    /**
     * Removes the field at the specified path. If there is no field at the
     * specified path, nothing is changed.
     *
     * @param path - The field path to remove.
     */    delete(t) {
        const e = this.field(t.popLast());
        Ht(e) && e.mapValue.fields && delete e.mapValue.fields[t.lastSegment()];
    }
    isEqual(t) {
        return $t(this.value, t.value);
    }
    /**
     * Returns the map that contains the leaf element of `path`. If the parent
     * entry does not yet exist, or if it is not a map, a new map will be created.
     */    getFieldsMap(t) {
        let e = this.value;
        e.mapValue.fields || (e.mapValue = {
            fields: {}
        });
        for (let n = 0; n < t.length; ++n) {
            let s = e.mapValue.fields[t.get(n)];
            Ht(s) && s.mapValue.fields || (s = {
                mapValue: {
                    fields: {}
                }
            }, e.mapValue.fields[t.get(n)] = s), e = s;
        }
        return e.mapValue.fields;
    }
    /**
     * Modifies `fieldsMap` by adding, replacing or deleting the specified
     * entries.
     */    applyChanges(t, e, n) {
        ft(e, ((e, n) => t[e] = n));
        for (const e of n) delete t[e];
    }
    clone() {
        return new ne(Jt(this.value));
    }
}

/**
 * Returns a FieldMask built from all fields in a MapValue.
 */ function se(t) {
    const e = [];
    return ft(t.fields, ((t, n) => {
        const s = new gt([ t ]);
        if (Ht(n)) {
            const t = se(n.mapValue).fields;
            if (0 === t.length) 
            // Preserve the empty map by adding it to the FieldMask.
            e.push(s); else 
            // For nested and non-empty ObjectValues, add the FieldPath of the
            // leaf nodes.
            for (const n of t) e.push(s.child(n));
        } else 
        // For nested and non-empty ObjectValues, add the FieldPath of the leaf
        // nodes.
        e.push(s);
    })), new yt(e);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Represents a document in Firestore with a key, version, data and whether it
 * has local mutations applied to it.
 *
 * Documents can transition between states via `convertToFoundDocument()`,
 * `convertToNoDocument()` and `convertToUnknownDocument()`. If a document does
 * not transition to one of these states even after all mutations have been
 * applied, `isValidDocument()` returns false and the document should be removed
 * from all views.
 */ class ie {
    constructor(t, e, n, s, i, r) {
        this.key = t, this.documentType = e, this.version = n, this.readTime = s, this.data = i, 
        this.documentState = r;
    }
    /**
     * Creates a document with no known version or data, but which can serve as
     * base document for mutations.
     */    static newInvalidDocument(t) {
        return new ie(t, 0 /* INVALID */ , ht.min(), ht.min(), ne.empty(), 0 /* SYNCED */);
    }
    /**
     * Creates a new document that is known to exist with the given data at the
     * given version.
     */    static newFoundDocument(t, e, n) {
        return new ie(t, 1 /* FOUND_DOCUMENT */ , e, ht.min(), n, 0 /* SYNCED */);
    }
    /** Creates a new document that is known to not exist at the given version. */    static newNoDocument(t, e) {
        return new ie(t, 2 /* NO_DOCUMENT */ , e, ht.min(), ne.empty(), 0 /* SYNCED */);
    }
    /**
     * Creates a new document that is known to exist at the given version but
     * whose data is not known (e.g. a document that was updated without a known
     * base document).
     */    static newUnknownDocument(t, e) {
        return new ie(t, 3 /* UNKNOWN_DOCUMENT */ , e, ht.min(), ne.empty(), 2 /* HAS_COMMITTED_MUTATIONS */);
    }
    /**
     * Changes the document type to indicate that it exists and that its version
     * and data are known.
     */    convertToFoundDocument(t, e) {
        return this.version = t, this.documentType = 1 /* FOUND_DOCUMENT */ , this.data = e, 
        this.documentState = 0 /* SYNCED */ , this;
    }
    /**
     * Changes the document type to indicate that it doesn't exist at the given
     * version.
     */    convertToNoDocument(t) {
        return this.version = t, this.documentType = 2 /* NO_DOCUMENT */ , this.data = ne.empty(), 
        this.documentState = 0 /* SYNCED */ , this;
    }
    /**
     * Changes the document type to indicate that it exists at a given version but
     * that its data is not known (e.g. a document that was updated without a known
     * base document).
     */    convertToUnknownDocument(t) {
        return this.version = t, this.documentType = 3 /* UNKNOWN_DOCUMENT */ , this.data = ne.empty(), 
        this.documentState = 2 /* HAS_COMMITTED_MUTATIONS */ , this;
    }
    setHasCommittedMutations() {
        return this.documentState = 2 /* HAS_COMMITTED_MUTATIONS */ , this;
    }
    setHasLocalMutations() {
        return this.documentState = 1 /* HAS_LOCAL_MUTATIONS */ , this;
    }
    setReadTime(t) {
        return this.readTime = t, this;
    }
    get hasLocalMutations() {
        return 1 /* HAS_LOCAL_MUTATIONS */ === this.documentState;
    }
    get hasCommittedMutations() {
        return 2 /* HAS_COMMITTED_MUTATIONS */ === this.documentState;
    }
    get hasPendingWrites() {
        return this.hasLocalMutations || this.hasCommittedMutations;
    }
    isValidDocument() {
        return 0 /* INVALID */ !== this.documentType;
    }
    isFoundDocument() {
        return 1 /* FOUND_DOCUMENT */ === this.documentType;
    }
    isNoDocument() {
        return 2 /* NO_DOCUMENT */ === this.documentType;
    }
    isUnknownDocument() {
        return 3 /* UNKNOWN_DOCUMENT */ === this.documentType;
    }
    isEqual(t) {
        return t instanceof ie && this.key.isEqual(t.key) && this.version.isEqual(t.version) && this.documentType === t.documentType && this.documentState === t.documentState && this.data.isEqual(t.data);
    }
    mutableCopy() {
        return new ie(this.key, this.documentType, this.version, this.readTime, this.data.clone(), this.documentState);
    }
    toString() {
        return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`;
    }
}

/**
 * Compares the value for field `field` in the provided documents. Throws if
 * the field does not exist in both documents.
 */
/**
 * An index definition for field indexes in Firestore.
 *
 * Every index is associated with a collection. The definition contains a list
 * of fields and their index kind (which can be `ASCENDING`, `DESCENDING` or
 * `CONTAINS` for ArrayContains/ArrayContainsAny queries).
 *
 * Unlike the backend, the SDK does not differentiate between collection or
 * collection group-scoped indices. Every index can be used for both single
 * collection and collection group queries.
 */
class re {
    constructor(
    /**
     * The index ID. Returns -1 if the index ID is not available (e.g. the index
     * has not yet been persisted).
     */
    t, 
    /** The collection ID this index applies to. */
    e, 
    /** The field segments for this index. */
    n, 
    /** Shows how up-to-date the index is for the current user. */
    s) {
        this.indexId = t, this.collectionGroup = e, this.fields = n, this.indexState = s;
    }
}

/** An ID for an index that has not yet been added to persistence.  */
/** Returns the ArrayContains/ArrayContainsAny segment for this index. */
function oe(t) {
    return t.fields.find((t => 2 /* CONTAINS */ === t.kind));
}

/** Returns all directional (ascending/descending) segments for this index. */ function ue(t) {
    return t.fields.filter((t => 2 /* CONTAINS */ !== t.kind));
}

/**
 * Returns the order of the document key component for the given index.
 *
 * PORTING NOTE: This is only used in the Web IndexedDb implementation.
 */ re.UNKNOWN_ID = -1;

/** An index component consisting of field path and index type.  */
class ae {
    constructor(
    /** The field path of the component. */
    t, 
    /** The fields sorting order. */
    e) {
        this.fieldPath = t, this.kind = e;
    }
}

/**
 * Stores the "high water mark" that indicates how updated the Index is for the
 * current user.
 */ class ce {
    constructor(
    /**
     * Indicates when the index was last updated (relative to other indexes).
     */
    t, 
    /** The the latest indexed read time, document and batch id. */
    e) {
        this.sequenceNumber = t, this.offset = e;
    }
    /** The state of an index that has not yet been backfilled. */    static empty() {
        return new ce(0, fe.min());
    }
}

/**
 * Creates an offset that matches all documents with a read time higher than
 * `readTime`.
 */ function he(t, e) {
    // We want to create an offset that matches all documents with a read time
    // greater than the provided read time. To do so, we technically need to
    // create an offset for `(readTime, MAX_DOCUMENT_KEY)`. While we could use
    // Unicode codepoints to generate MAX_DOCUMENT_KEY, it is much easier to use
    // `(readTime + 1, DocumentKey.empty())` since `> DocumentKey.empty()` matches
    // all valid document IDs.
    const n = t.toTimestamp().seconds, s = t.toTimestamp().nanoseconds + 1, i = ht.fromTimestamp(1e9 === s ? new ct(n + 1, 0) : new ct(n, s));
    return new fe(i, kt.empty(), e);
}

/** Creates a new offset based on the provided document. */ function le(t) {
    return new fe(t.readTime, t.key, -1);
}

/**
 * Stores the latest read time, document and batch ID that were processed for an
 * index.
 */ class fe {
    constructor(
    /**
     * The latest read time version that has been indexed by Firestore for this
     * field index.
     */
    t, 
    /**
     * The key of the last document that was indexed for this query. Use
     * `DocumentKey.empty()` if no document has been indexed.
     */
    e, 
    /*
     * The largest mutation batch id that's been processed by Firestore.
     */
    n) {
        this.readTime = t, this.documentKey = e, this.largestBatchId = n;
    }
    /** Returns an offset that sorts before all regular offsets. */    static min() {
        return new fe(ht.min(), kt.empty(), -1);
    }
    /** Returns an offset that sorts after all regular offsets. */    static max() {
        return new fe(ht.max(), kt.empty(), -1);
    }
}

function de(t, e) {
    let n = t.readTime.compareTo(e.readTime);
    return 0 !== n ? n : (n = kt.comparator(t.documentKey, e.documentKey), 0 !== n ? n : ot(t.largestBatchId, e.largestBatchId));
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Visible for testing
class _e {
    constructor(t, e = null, n = [], s = [], i = null, r = null, o = null) {
        this.path = t, this.collectionGroup = e, this.orderBy = n, this.filters = s, this.limit = i, 
        this.startAt = r, this.endAt = o, this.P = null;
    }
}

/**
 * Initializes a Target with a path and optional additional query constraints.
 * Path must currently be empty if this is a collection group query.
 *
 * NOTE: you should always construct `Target` from `Query.toTarget` instead of
 * using this factory method, because `Query` provides an implicit `orderBy`
 * property.
 */ function we(t, e = null, n = [], s = [], i = null, r = null, o = null) {
    return new _e(t, e, n, s, i, r, o);
}

function me(t) {
    const e = G(t);
    if (null === e.P) {
        let t = e.path.canonicalString();
        null !== e.collectionGroup && (t += "|cg:" + e.collectionGroup), t += "|f:", t += e.filters.map((t => {
            return (e = t).field.canonicalString() + e.op.toString() + qt(e.value);
            var e;
        })).join(","), t += "|ob:", t += e.orderBy.map((t => function(t) {
            // TODO(b/29183165): Make this collision robust.
            return t.field.canonicalString() + t.dir;
        }(t))).join(","), Ct(e.limit) || (t += "|l:", t += e.limit), e.startAt && (t += "|lb:", 
        t += e.startAt.inclusive ? "b:" : "a:", t += e.startAt.position.map((t => qt(t))).join(",")), 
        e.endAt && (t += "|ub:", t += e.endAt.inclusive ? "a:" : "b:", t += e.endAt.position.map((t => qt(t))).join(",")), 
        e.P = t;
    }
    return e.P;
}

function ge(t) {
    let e = t.path.canonicalString();
    return null !== t.collectionGroup && (e += " collectionGroup=" + t.collectionGroup), 
    t.filters.length > 0 && (e += `, filters: [${t.filters.map((t => {
        return `${(e = t).field.canonicalString()} ${e.op} ${qt(e.value)}`;
        /** Returns a debug description for `filter`. */
        var e;
        /** Filter that matches on key fields (i.e. '__name__'). */    })).join(", ")}]`), 
    Ct(t.limit) || (e += ", limit: " + t.limit), t.orderBy.length > 0 && (e += `, orderBy: [${t.orderBy.map((t => function(t) {
        return `${t.field.canonicalString()} (${t.dir})`;
    }(t))).join(", ")}]`), t.startAt && (e += ", startAt: ", e += t.startAt.inclusive ? "b:" : "a:", 
    e += t.startAt.position.map((t => qt(t))).join(",")), t.endAt && (e += ", endAt: ", 
    e += t.endAt.inclusive ? "a:" : "b:", e += t.endAt.position.map((t => qt(t))).join(",")), 
    `Target(${e})`;
}

function ye(t, e) {
    if (t.limit !== e.limit) return !1;
    if (t.orderBy.length !== e.orderBy.length) return !1;
    for (let n = 0; n < t.orderBy.length; n++) if (!ke(t.orderBy[n], e.orderBy[n])) return !1;
    if (t.filters.length !== e.filters.length) return !1;
    for (let i = 0; i < t.filters.length; i++) if (n = t.filters[i], s = e.filters[i], 
    n.op !== s.op || !n.field.isEqual(s.field) || !$t(n.value, s.value)) return !1;
    var n, s;
    return t.collectionGroup === e.collectionGroup && (!!t.path.isEqual(e.path) && (!!Oe(t.startAt, e.startAt) && Oe(t.endAt, e.endAt)));
}

function pe(t) {
    return kt.isDocumentKey(t.path) && null === t.collectionGroup && 0 === t.filters.length;
}

/** Returns the field filters that target the given field path. */ function Ie(t, e) {
    return t.filters.filter((t => t instanceof Ae && t.field.isEqual(e)));
}

/**
 * Returns the values that are used in ARRAY_CONTAINS or ARRAY_CONTAINS_ANY
 * filters. Returns `null` if there are no such filters.
 */
/**
 * Returns the value to use as the lower bound for ascending index segment at
 * the provided `fieldPath` (or the upper bound for an descending segment).
 */
function Te(t, e, n) {
    let s, i = !0;
    // Process all filters to find a value for the current field segment
    for (const n of Ie(t, e)) {
        let t, e = !0;
        switch (n.op) {
          case "<" /* LESS_THAN */ :
          case "<=" /* LESS_THAN_OR_EQUAL */ :
            t = Xt(n.value);
            break;

          case "==" /* EQUAL */ :
          case "in" /* IN */ :
          case ">=" /* GREATER_THAN_OR_EQUAL */ :
            t = n.value;
            break;

          case ">" /* GREATER_THAN */ :
            t = n.value, e = !1;
            break;

          case "!=" /* NOT_EQUAL */ :
          case "not-in" /* NOT_IN */ :
            t = Ot;
 // Remaining filters cannot be used as lower bounds.
                }
        te(s, t) === t && (s = t, i = e);
    }
    // If there is an additional bound, compare the values against the existing
    // range to see if we can narrow the scope.
        if (null !== n) for (let r = 0; r < t.orderBy.length; ++r) {
        if (t.orderBy[r].field.isEqual(e)) {
            const t = n.position[r];
            te(s, t) === t && (s = t, i = n.inclusive);
            break;
        }
    }
    return {
        value: s,
        inclusive: i
    };
}

/**
 * Returns the value to use as the upper bound for ascending index segment at
 * the provided `fieldPath` (or the lower bound for an descending segment).
 */ function Ee(t, e, n) {
    let s, i = !0;
    // Process all filters to find a value for the current field segment
    for (const n of Ie(t, e)) {
        let t, e = !0;
        switch (n.op) {
          case ">=" /* GREATER_THAN_OR_EQUAL */ :
          case ">" /* GREATER_THAN */ :
            t = Zt(n.value), e = !1;
            break;

          case "==" /* EQUAL */ :
          case "in" /* IN */ :
          case "<=" /* LESS_THAN_OR_EQUAL */ :
            t = n.value;
            break;

          case "<" /* LESS_THAN */ :
            t = n.value, e = !1;
            break;

          case "!=" /* NOT_EQUAL */ :
          case "not-in" /* NOT_IN */ :
            t = Mt;
 // Remaining filters cannot be used as upper bounds.
                }
        ee(s, t) === t && (s = t, i = e);
    }
    // If there is an additional bound, compare the values against the existing
    // range to see if we can narrow the scope.
        if (null !== n) for (let r = 0; r < t.orderBy.length; ++r) {
        if (t.orderBy[r].field.isEqual(e)) {
            const t = n.position[r];
            ee(s, t) === t && (s = t, i = n.inclusive);
            break;
        }
    }
    return {
        value: s,
        inclusive: i
    };
}

class Ae extends class {} {
    constructor(t, e, n) {
        super(), this.field = t, this.op = e, this.value = n;
    }
    /**
     * Creates a filter based on the provided arguments.
     */    static create(t, e, n) {
        return t.isKeyField() ? "in" /* IN */ === e || "not-in" /* NOT_IN */ === e ? this.V(t, e, n) : new Re(t, e, n) : "array-contains" /* ARRAY_CONTAINS */ === e ? new ve(t, n) : "in" /* IN */ === e ? new Se(t, n) : "not-in" /* NOT_IN */ === e ? new De(t, n) : "array-contains-any" /* ARRAY_CONTAINS_ANY */ === e ? new Ce(t, n) : new Ae(t, e, n);
    }
    static V(t, e, n) {
        return "in" /* IN */ === e ? new Pe(t, n) : new be(t, n);
    }
    matches(t) {
        const e = t.data.field(this.field);
        // Types do not have to match in NOT_EQUAL filters.
                return "!=" /* NOT_EQUAL */ === this.op ? null !== e && this.v(Lt(e, this.value)) : null !== e && Ft(this.value) === Ft(e) && this.v(Lt(e, this.value));
        // Only compare types with matching backend order (such as double and int).
        }
    v(t) {
        switch (this.op) {
          case "<" /* LESS_THAN */ :
            return t < 0;

          case "<=" /* LESS_THAN_OR_EQUAL */ :
            return t <= 0;

          case "==" /* EQUAL */ :
            return 0 === t;

          case "!=" /* NOT_EQUAL */ :
            return 0 !== t;

          case ">" /* GREATER_THAN */ :
            return t > 0;

          case ">=" /* GREATER_THAN_OR_EQUAL */ :
            return t >= 0;

          default:
            return U();
        }
    }
    S() {
        return [ "<" /* LESS_THAN */ , "<=" /* LESS_THAN_OR_EQUAL */ , ">" /* GREATER_THAN */ , ">=" /* GREATER_THAN_OR_EQUAL */ , "!=" /* NOT_EQUAL */ , "not-in" /* NOT_IN */ ].indexOf(this.op) >= 0;
    }
}

class Re extends Ae {
    constructor(t, e, n) {
        super(t, e, n), this.key = kt.fromName(n.referenceValue);
    }
    matches(t) {
        const e = kt.comparator(t.key, this.key);
        return this.v(e);
    }
}

/** Filter that matches on key fields within an array. */ class Pe extends Ae {
    constructor(t, e) {
        super(t, "in" /* IN */ , e), this.keys = Ve("in" /* IN */ , e);
    }
    matches(t) {
        return this.keys.some((e => e.isEqual(t.key)));
    }
}

/** Filter that matches on key fields not present within an array. */ class be extends Ae {
    constructor(t, e) {
        super(t, "not-in" /* NOT_IN */ , e), this.keys = Ve("not-in" /* NOT_IN */ , e);
    }
    matches(t) {
        return !this.keys.some((e => e.isEqual(t.key)));
    }
}

function Ve(t, e) {
    var n;
    return ((null === (n = e.arrayValue) || void 0 === n ? void 0 : n.values) || []).map((t => kt.fromName(t.referenceValue)));
}

/** A Filter that implements the array-contains operator. */ class ve extends Ae {
    constructor(t, e) {
        super(t, "array-contains" /* ARRAY_CONTAINS */ , e);
    }
    matches(t) {
        const e = t.data.field(this.field);
        return jt(e) && Bt(e.arrayValue, this.value);
    }
}

/** A Filter that implements the IN operator. */ class Se extends Ae {
    constructor(t, e) {
        super(t, "in" /* IN */ , e);
    }
    matches(t) {
        const e = t.data.field(this.field);
        return null !== e && Bt(this.value.arrayValue, e);
    }
}

/** A Filter that implements the not-in operator. */ class De extends Ae {
    constructor(t, e) {
        super(t, "not-in" /* NOT_IN */ , e);
    }
    matches(t) {
        if (Bt(this.value.arrayValue, {
            nullValue: "NULL_VALUE"
        })) return !1;
        const e = t.data.field(this.field);
        return null !== e && !Bt(this.value.arrayValue, e);
    }
}

/** A Filter that implements the array-contains-any operator. */ class Ce extends Ae {
    constructor(t, e) {
        super(t, "array-contains-any" /* ARRAY_CONTAINS_ANY */ , e);
    }
    matches(t) {
        const e = t.data.field(this.field);
        return !(!jt(e) || !e.arrayValue.values) && e.arrayValue.values.some((t => Bt(this.value.arrayValue, t)));
    }
}

/**
 * Represents a bound of a query.
 *
 * The bound is specified with the given components representing a position and
 * whether it's just before or just after the position (relative to whatever the
 * query order is).
 *
 * The position represents a logical index position for a query. It's a prefix
 * of values for the (potentially implicit) order by clauses of a query.
 *
 * Bound provides a function to determine whether a document comes before or
 * after a bound. This is influenced by whether the position is just before or
 * just after the provided values.
 */ class xe {
    constructor(t, e) {
        this.position = t, this.inclusive = e;
    }
}

/**
 * An ordering on a field, in some Direction. Direction defaults to ASCENDING.
 */ class Ne {
    constructor(t, e = "asc" /* ASCENDING */) {
        this.field = t, this.dir = e;
    }
}

function ke(t, e) {
    return t.dir === e.dir && t.field.isEqual(e.field);
}

function Me(t, e, n) {
    let s = 0;
    for (let i = 0; i < t.position.length; i++) {
        const r = e[i], o = t.position[i];
        if (r.field.isKeyField()) s = kt.comparator(kt.fromName(o.referenceValue), n.key); else {
            s = Lt(o, n.data.field(r.field));
        }
        if ("desc" /* DESCENDING */ === r.dir && (s *= -1), 0 !== s) break;
    }
    return s;
}

/**
 * Returns true if a document sorts after a bound using the provided sort
 * order.
 */ function Oe(t, e) {
    if (null === t) return null === e;
    if (null === e) return !1;
    if (t.inclusive !== e.inclusive || t.position.length !== e.position.length) return !1;
    for (let n = 0; n < t.position.length; n++) {
        if (!$t(t.position[n], e.position[n])) return !1;
    }
    return !0;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Query encapsulates all the query attributes we support in the SDK. It can
 * be run against the LocalStore, as well as be converted to a `Target` to
 * query the RemoteStore results.
 *
 * Visible for testing.
 */ class Fe {
    /**
     * Initializes a Query with a path and optional additional query constraints.
     * Path must currently be empty if this is a collection group query.
     */
    constructor(t, e = null, n = [], s = [], i = null, r = "F" /* First */ , o = null, u = null) {
        this.path = t, this.collectionGroup = e, this.explicitOrderBy = n, this.filters = s, 
        this.limit = i, this.limitType = r, this.startAt = o, this.endAt = u, this.D = null, 
        // The corresponding `Target` of this `Query` instance.
        this.C = null, this.startAt, this.endAt;
    }
}

/** Creates a new Query instance with the options provided. */ function $e(t, e, n, s, i, r, o, u) {
    return new Fe(t, e, n, s, i, r, o, u);
}

/** Creates a new Query for a query that matches all documents at `path` */ function Be(t) {
    return new Fe(t);
}

/**
 * Helper to convert a collection group query into a collection query at a
 * specific path. This is used when executing collection group queries, since
 * we have to split the query into a set of collection queries at multiple
 * paths.
 */ function Le(t) {
    return !Ct(t.limit) && "F" /* First */ === t.limitType;
}

function Ue(t) {
    return !Ct(t.limit) && "L" /* Last */ === t.limitType;
}

function qe(t) {
    return t.explicitOrderBy.length > 0 ? t.explicitOrderBy[0].field : null;
}

function Ke(t) {
    for (const e of t.filters) if (e.S()) return e.field;
    return null;
}

/**
 * Checks if any of the provided Operators are included in the query and
 * returns the first one that is, or null if none are.
 */
/**
 * Returns whether the query matches a collection group rather than a specific
 * collection.
 */
function Ge(t) {
    return null !== t.collectionGroup;
}

/**
 * Returns the implicit order by constraint that is used to execute the Query,
 * which can be different from the order by constraints the user provided (e.g.
 * the SDK and backend always orders by `__name__`).
 */ function Qe(t) {
    const e = G(t);
    if (null === e.D) {
        e.D = [];
        const t = Ke(e), n = qe(e);
        if (null !== t && null === n) 
        // In order to implicitly add key ordering, we must also add the
        // inequality filter field for it to be a valid query.
        // Note that the default inequality field and key ordering is ascending.
        t.isKeyField() || e.D.push(new Ne(t)), e.D.push(new Ne(gt.keyField(), "asc" /* ASCENDING */)); else {
            let t = !1;
            for (const n of e.explicitOrderBy) e.D.push(n), n.field.isKeyField() && (t = !0);
            if (!t) {
                // The order of the implicit key ordering always matches the last
                // explicit order by
                const t = e.explicitOrderBy.length > 0 ? e.explicitOrderBy[e.explicitOrderBy.length - 1].dir : "asc" /* ASCENDING */;
                e.D.push(new Ne(gt.keyField(), t));
            }
        }
    }
    return e.D;
}

/**
 * Converts this `Query` instance to it's corresponding `Target` representation.
 */ function je(t) {
    const e = G(t);
    if (!e.C) if ("F" /* First */ === e.limitType) e.C = we(e.path, e.collectionGroup, Qe(e), e.filters, e.limit, e.startAt, e.endAt); else {
        // Flip the orderBy directions since we want the last results
        const t = [];
        for (const n of Qe(e)) {
            const e = "desc" /* DESCENDING */ === n.dir ? "asc" /* ASCENDING */ : "desc" /* DESCENDING */;
            t.push(new Ne(n.field, e));
        }
        // We need to swap the cursors to match the now-flipped query ordering.
                const n = e.endAt ? new xe(e.endAt.position, !e.endAt.inclusive) : null, s = e.startAt ? new xe(e.startAt.position, !e.startAt.inclusive) : null;
        // Now return as a LimitType.First query.
        e.C = we(e.path, e.collectionGroup, t, e.filters, e.limit, n, s);
    }
    return e.C;
}

function We(t, e, n) {
    return new Fe(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), e, n, t.startAt, t.endAt);
}

function ze(t, e) {
    return ye(je(t), je(e)) && t.limitType === e.limitType;
}

// TODO(b/29183165): This is used to get a unique string from a query to, for
// example, use as a dictionary key, but the implementation is subject to
// collisions. Make it collision-free.
function He(t) {
    return `${me(je(t))}|lt:${t.limitType}`;
}

function Je(t) {
    return `Query(target=${ge(je(t))}; limitType=${t.limitType})`;
}

/** Returns whether `doc` matches the constraints of `query`. */ function Ye(t, e) {
    return e.isFoundDocument() && function(t, e) {
        const n = e.key.path;
        return null !== t.collectionGroup ? e.key.hasCollectionId(t.collectionGroup) && t.path.isPrefixOf(n) : kt.isDocumentKey(t.path) ? t.path.isEqual(n) : t.path.isImmediateParentOf(n);
    }
    /**
 * A document must have a value for every ordering clause in order to show up
 * in the results.
 */ (t, e) && function(t, e) {
        for (const n of t.explicitOrderBy) 
        // order by key always matches
        if (!n.field.isKeyField() && null === e.data.field(n.field)) return !1;
        return !0;
    }(t, e) && function(t, e) {
        for (const n of t.filters) if (!n.matches(e)) return !1;
        return !0;
    }
    /** Makes sure a document is within the bounds, if provided. */ (t, e) && function(t, e) {
        if (t.startAt && !
        /**
 * Returns true if a document sorts before a bound using the provided sort
 * order.
 */
        function(t, e, n) {
            const s = Me(t, e, n);
            return t.inclusive ? s <= 0 : s < 0;
        }(t.startAt, Qe(t), e)) return !1;
        if (t.endAt && !function(t, e, n) {
            const s = Me(t, e, n);
            return t.inclusive ? s >= 0 : s > 0;
        }(t.endAt, Qe(t), e)) return !1;
        return !0;
    }
    /**
 * Returns the collection group that this query targets.
 *
 * PORTING NOTE: This is only used in the Web SDK to facilitate multi-tab
 * synchronization for query results.
 */ (t, e);
}

function Xe(t) {
    return t.collectionGroup || (t.path.length % 2 == 1 ? t.path.lastSegment() : t.path.get(t.path.length - 2));
}

/**
 * Returns a new comparator function that can be used to compare two documents
 * based on the Query's ordering constraint.
 */ function Ze(t) {
    return (e, n) => {
        let s = !1;
        for (const i of Qe(t)) {
            const t = tn(i, e, n);
            if (0 !== t) return t;
            s = s || i.field.isKeyField();
        }
        return 0;
    };
}

function tn(t, e, n) {
    const s = t.field.isKeyField() ? kt.comparator(e.key, n.key) : function(t, e, n) {
        const s = e.data.field(t), i = n.data.field(t);
        return null !== s && null !== i ? Lt(s, i) : U();
    }
    /**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
    /**
 * The initial mutation batch id for each index. Gets updated during index
 * backfill.
 */ (t.field, e, n);
    switch (t.dir) {
      case "asc" /* ASCENDING */ :
        return s;

      case "desc" /* DESCENDING */ :
        return -1 * s;

      default:
        return U();
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns an DoubleValue for `value` that is encoded based the serializer's
 * `useProto3Json` setting.
 */ function en(t, e) {
    if (t.N) {
        if (isNaN(e)) return {
            doubleValue: "NaN"
        };
        if (e === 1 / 0) return {
            doubleValue: "Infinity"
        };
        if (e === -1 / 0) return {
            doubleValue: "-Infinity"
        };
    }
    return {
        doubleValue: xt(e) ? "-0" : e
    };
}

/**
 * Returns an IntegerValue for `value`.
 */ function nn(t) {
    return {
        integerValue: "" + t
    };
}

/**
 * Returns a value for a number that's appropriate to put into a proto.
 * The return value is an IntegerValue if it can safely represent the value,
 * otherwise a DoubleValue is returned.
 */ function sn(t, e) {
    return Nt(e) ? nn(e) : en(t, e);
}

/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Used to represent a field transform on a mutation. */ class rn {
    constructor() {
        // Make sure that the structural type of `TransformOperation` is unique.
        // See https://github.com/microsoft/TypeScript/issues/5451
        this._ = void 0;
    }
}

/**
 * Computes the local transform result against the provided `previousValue`,
 * optionally using the provided localWriteTime.
 */ function on(t, e, n) {
    return t instanceof cn ? function(t, e) {
        const n = {
            fields: {
                __type__: {
                    stringValue: "server_timestamp"
                },
                __local_write_time__: {
                    timestampValue: {
                        seconds: t.seconds,
                        nanos: t.nanoseconds
                    }
                }
            }
        };
        return e && (n.fields.__previous_value__ = e), {
            mapValue: n
        };
    }(n, e) : t instanceof hn ? ln(t, e) : t instanceof fn ? dn(t, e) : function(t, e) {
        // PORTING NOTE: Since JavaScript's integer arithmetic is limited to 53 bit
        // precision and resolves overflows by reducing precision, we do not
        // manually cap overflows at 2^63.
        const n = an(t, e), s = wn(n) + wn(t.k);
        return Qt(n) && Qt(t.k) ? nn(s) : en(t.M, s);
    }(t, e);
}

/**
 * Computes a final transform result after the transform has been acknowledged
 * by the server, potentially using the server-provided transformResult.
 */ function un(t, e, n) {
    // The server just sends null as the transform result for array operations,
    // so we have to calculate a result the same as we do for local
    // applications.
    return t instanceof hn ? ln(t, e) : t instanceof fn ? dn(t, e) : n;
}

/**
 * If this transform operation is not idempotent, returns the base value to
 * persist for this transform. If a base value is returned, the transform
 * operation is always applied to this base value, even if document has
 * already been updated.
 *
 * Base values provide consistent behavior for non-idempotent transforms and
 * allow us to return the same latency-compensated value even if the backend
 * has already applied the transform operation. The base value is null for
 * idempotent transforms, as they can be re-played even if the backend has
 * already applied them.
 *
 * @returns a base value to store along with the mutation, or null for
 * idempotent transforms.
 */ function an(t, e) {
    return t instanceof _n ? Qt(n = e) || function(t) {
        return !!t && "doubleValue" in t;
    }
    /** Returns true if `value` is either an IntegerValue or a DoubleValue. */ (n) ? e : {
        integerValue: 0
    } : null;
    var n;
}

/** Transforms a value into a server-generated timestamp. */
class cn extends rn {}

/** Transforms an array value via a union operation. */ class hn extends rn {
    constructor(t) {
        super(), this.elements = t;
    }
}

function ln(t, e) {
    const n = mn(e);
    for (const e of t.elements) n.some((t => $t(t, e))) || n.push(e);
    return {
        arrayValue: {
            values: n
        }
    };
}

/** Transforms an array value via a remove operation. */ class fn extends rn {
    constructor(t) {
        super(), this.elements = t;
    }
}

function dn(t, e) {
    let n = mn(e);
    for (const e of t.elements) n = n.filter((t => !$t(t, e)));
    return {
        arrayValue: {
            values: n
        }
    };
}

/**
 * Implements the backend semantics for locally computed NUMERIC_ADD (increment)
 * transforms. Converts all field values to integers or doubles, but unlike the
 * backend does not cap integer values at 2^63. Instead, JavaScript number
 * arithmetic is used and precision loss can occur for values greater than 2^53.
 */ class _n extends rn {
    constructor(t, e) {
        super(), this.M = t, this.k = e;
    }
}

function wn(t) {
    return Rt(t.integerValue || t.doubleValue);
}

function mn(t) {
    return jt(t) && t.arrayValue.values ? t.arrayValue.values.slice() : [];
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** A field path and the TransformOperation to perform upon it. */ class gn {
    constructor(t, e) {
        this.field = t, this.transform = e;
    }
}

function yn(t, e) {
    return t.field.isEqual(e.field) && function(t, e) {
        return t instanceof hn && e instanceof hn || t instanceof fn && e instanceof fn ? ut(t.elements, e.elements, $t) : t instanceof _n && e instanceof _n ? $t(t.k, e.k) : t instanceof cn && e instanceof cn;
    }(t.transform, e.transform);
}

/** The result of successfully applying a mutation to the backend. */
class pn {
    constructor(
    /**
     * The version at which the mutation was committed:
     *
     * - For most operations, this is the updateTime in the WriteResult.
     * - For deletes, the commitTime of the WriteResponse (because deletes are
     *   not stored and have no updateTime).
     *
     * Note that these versions can be different: No-op writes will not change
     * the updateTime even though the commitTime advances.
     */
    t, 
    /**
     * The resulting fields returned from the backend after a mutation
     * containing field transforms has been committed. Contains one FieldValue
     * for each FieldTransform that was in the mutation.
     *
     * Will be empty if the mutation did not contain any field transforms.
     */
    e) {
        this.version = t, this.transformResults = e;
    }
}

/**
 * Encodes a precondition for a mutation. This follows the model that the
 * backend accepts with the special case of an explicit "empty" precondition
 * (meaning no precondition).
 */ class In {
    constructor(t, e) {
        this.updateTime = t, this.exists = e;
    }
    /** Creates a new empty Precondition. */    static none() {
        return new In;
    }
    /** Creates a new Precondition with an exists flag. */    static exists(t) {
        return new In(void 0, t);
    }
    /** Creates a new Precondition based on a version a document exists at. */    static updateTime(t) {
        return new In(t);
    }
    /** Returns whether this Precondition is empty. */    get isNone() {
        return void 0 === this.updateTime && void 0 === this.exists;
    }
    isEqual(t) {
        return this.exists === t.exists && (this.updateTime ? !!t.updateTime && this.updateTime.isEqual(t.updateTime) : !t.updateTime);
    }
}

/** Returns true if the preconditions is valid for the given document. */ function Tn(t, e) {
    return void 0 !== t.updateTime ? e.isFoundDocument() && e.version.isEqual(t.updateTime) : void 0 === t.exists || t.exists === e.isFoundDocument();
}

/**
 * A mutation describes a self-contained change to a document. Mutations can
 * create, replace, delete, and update subsets of documents.
 *
 * Mutations not only act on the value of the document but also its version.
 *
 * For local mutations (mutations that haven't been committed yet), we preserve
 * the existing version for Set and Patch mutations. For Delete mutations, we
 * reset the version to 0.
 *
 * Here's the expected transition table.
 *
 * MUTATION           APPLIED TO            RESULTS IN
 *
 * SetMutation        Document(v3)          Document(v3)
 * SetMutation        NoDocument(v3)        Document(v0)
 * SetMutation        InvalidDocument(v0)   Document(v0)
 * PatchMutation      Document(v3)          Document(v3)
 * PatchMutation      NoDocument(v3)        NoDocument(v3)
 * PatchMutation      InvalidDocument(v0)   UnknownDocument(v3)
 * DeleteMutation     Document(v3)          NoDocument(v0)
 * DeleteMutation     NoDocument(v3)        NoDocument(v0)
 * DeleteMutation     InvalidDocument(v0)   NoDocument(v0)
 *
 * For acknowledged mutations, we use the updateTime of the WriteResponse as
 * the resulting version for Set and Patch mutations. As deletes have no
 * explicit update time, we use the commitTime of the WriteResponse for
 * Delete mutations.
 *
 * If a mutation is acknowledged by the backend but fails the precondition check
 * locally, we transition to an `UnknownDocument` and rely on Watch to send us
 * the updated version.
 *
 * Field transforms are used only with Patch and Set Mutations. We use the
 * `updateTransforms` message to store transforms, rather than the `transforms`s
 * messages.
 *
 * ## Subclassing Notes
 *
 * Every type of mutation needs to implement its own applyToRemoteDocument() and
 * applyToLocalView() to implement the actual behavior of applying the mutation
 * to some source document (see `setMutationApplyToRemoteDocument()` for an
 * example).
 */ class En {}

/**
 * Applies this mutation to the given document for the purposes of computing a
 * new remote document. If the input document doesn't match the expected state
 * (e.g. it is invalid or outdated), the document type may transition to
 * unknown.
 *
 * @param mutation - The mutation to apply.
 * @param document - The document to mutate. The input document can be an
 *     invalid document if the client has no knowledge of the pre-mutation state
 *     of the document.
 * @param mutationResult - The result of applying the mutation from the backend.
 */ function An(t, e, n) {
    t instanceof vn ? function(t, e, n) {
        // Unlike setMutationApplyToLocalView, if we're applying a mutation to a
        // remote document the server has accepted the mutation so the precondition
        // must have held.
        const s = t.value.clone(), i = Cn(t.fieldTransforms, e, n.transformResults);
        s.setAll(i), e.convertToFoundDocument(n.version, s).setHasCommittedMutations();
    }(t, e, n) : t instanceof Sn ? function(t, e, n) {
        if (!Tn(t.precondition, e)) 
        // Since the mutation was not rejected, we know that the precondition
        // matched on the backend. We therefore must not have the expected version
        // of the document in our cache and convert to an UnknownDocument with a
        // known updateTime.
        return void e.convertToUnknownDocument(n.version);
        const s = Cn(t.fieldTransforms, e, n.transformResults), i = e.data;
        i.setAll(Dn(t)), i.setAll(s), e.convertToFoundDocument(n.version, i).setHasCommittedMutations();
    }(t, e, n) : function(t, e, n) {
        // Unlike applyToLocalView, if we're applying a mutation to a remote
        // document the server has accepted the mutation so the precondition must
        // have held.
        e.convertToNoDocument(n.version).setHasCommittedMutations();
    }(0, e, n);
}

/**
 * Applies this mutation to the given document for the purposes of computing
 * the new local view of a document. If the input document doesn't match the
 * expected state, the document is not modified.
 *
 * @param mutation - The mutation to apply.
 * @param document - The document to mutate. The input document can be an
 *     invalid document if the client has no knowledge of the pre-mutation state
 *     of the document.
 * @param localWriteTime - A timestamp indicating the local write time of the
 *     batch this mutation is a part of.
 */ function Rn(t, e, n) {
    t instanceof vn ? function(t, e, n) {
        if (!Tn(t.precondition, e)) 
        // The mutation failed to apply (e.g. a document ID created with add()
        // caused a name collision).
        return;
        const s = t.value.clone(), i = xn(t.fieldTransforms, n, e);
        s.setAll(i), e.convertToFoundDocument(Vn(e), s).setHasLocalMutations();
    }
    /**
 * A mutation that modifies fields of the document at the given key with the
 * given values. The values are applied through a field mask:
 *
 *  * When a field is in both the mask and the values, the corresponding field
 *    is updated.
 *  * When a field is in neither the mask nor the values, the corresponding
 *    field is unmodified.
 *  * When a field is in the mask but not in the values, the corresponding field
 *    is deleted.
 *  * When a field is not in the mask but is in the values, the values map is
 *    ignored.
 */ (t, e, n) : t instanceof Sn ? function(t, e, n) {
        if (!Tn(t.precondition, e)) return;
        const s = xn(t.fieldTransforms, n, e), i = e.data;
        i.setAll(Dn(t)), i.setAll(s), e.convertToFoundDocument(Vn(e), i).setHasLocalMutations();
    }
    /**
 * Returns a FieldPath/Value map with the content of the PatchMutation.
 */ (t, e, n) : function(t, e) {
        Tn(t.precondition, e) && 
        // We don't call `setHasLocalMutations()` since we want to be backwards
        // compatible with the existing SDK behavior.
        e.convertToNoDocument(ht.min());
    }
    /**
 * A mutation that verifies the existence of the document at the given key with
 * the provided precondition.
 *
 * The `verify` operation is only used in Transactions, and this class serves
 * primarily to facilitate serialization into protos.
 */ (t, e);
}

/**
 * If this mutation is not idempotent, returns the base value to persist with
 * this mutation. If a base value is returned, the mutation is always applied
 * to this base value, even if document has already been updated.
 *
 * The base value is a sparse object that consists of only the document
 * fields for which this mutation contains a non-idempotent transformation
 * (e.g. a numeric increment). The provided value guarantees consistent
 * behavior for non-idempotent transforms and allow us to return the same
 * latency-compensated value even if the backend has already applied the
 * mutation. The base value is null for idempotent mutations, as they can be
 * re-played even if the backend has already applied them.
 *
 * @returns a base value to store along with the mutation, or null for
 * idempotent mutations.
 */ function Pn(t, e) {
    let n = null;
    for (const s of t.fieldTransforms) {
        const t = e.data.field(s.field), i = an(s.transform, t || null);
        null != i && (null == n && (n = ne.empty()), n.set(s.field, i));
    }
    return n || null;
}

function bn(t, e) {
    return t.type === e.type && (!!t.key.isEqual(e.key) && (!!t.precondition.isEqual(e.precondition) && (!!function(t, e) {
        return void 0 === t && void 0 === e || !(!t || !e) && ut(t, e, ((t, e) => yn(t, e)));
    }(t.fieldTransforms, e.fieldTransforms) && (0 /* Set */ === t.type ? t.value.isEqual(e.value) : 1 /* Patch */ !== t.type || t.data.isEqual(e.data) && t.fieldMask.isEqual(e.fieldMask)))));
}

/**
 * Returns the version from the given document for use as the result of a
 * mutation. Mutations are defined to return the version of the base document
 * only if it is an existing document. Deleted and unknown documents have a
 * post-mutation version of SnapshotVersion.min().
 */ function Vn(t) {
    return t.isFoundDocument() ? t.version : ht.min();
}

/**
 * A mutation that creates or replaces the document at the given key with the
 * object value contents.
 */ class vn extends En {
    constructor(t, e, n, s = []) {
        super(), this.key = t, this.value = e, this.precondition = n, this.fieldTransforms = s, 
        this.type = 0 /* Set */;
    }
}

class Sn extends En {
    constructor(t, e, n, s, i = []) {
        super(), this.key = t, this.data = e, this.fieldMask = n, this.precondition = s, 
        this.fieldTransforms = i, this.type = 1 /* Patch */;
    }
}

function Dn(t) {
    const e = new Map;
    return t.fieldMask.fields.forEach((n => {
        if (!n.isEmpty()) {
            const s = t.data.field(n);
            e.set(n, s);
        }
    })), e;
}

/**
 * Creates a list of "transform results" (a transform result is a field value
 * representing the result of applying a transform) for use after a mutation
 * containing transforms has been acknowledged by the server.
 *
 * @param fieldTransforms - The field transforms to apply the result to.
 * @param mutableDocument - The current state of the document after applying all
 * previous mutations.
 * @param serverTransformResults - The transform results received by the server.
 * @returns The transform results list.
 */ function Cn(t, e, n) {
    const s = new Map;
    q(t.length === n.length);
    for (let i = 0; i < n.length; i++) {
        const r = t[i], o = r.transform, u = e.data.field(r.field);
        s.set(r.field, un(o, u, n[i]));
    }
    return s;
}

/**
 * Creates a list of "transform results" (a transform result is a field value
 * representing the result of applying a transform) for use when applying a
 * transform locally.
 *
 * @param fieldTransforms - The field transforms to apply the result to.
 * @param localWriteTime - The local time of the mutation (used to
 *     generate ServerTimestampValues).
 * @param mutableDocument - The current state of the document after applying all
 *     previous mutations.
 * @returns The transform results list.
 */ function xn(t, e, n) {
    const s = new Map;
    for (const i of t) {
        const t = i.transform, r = n.data.field(i.field);
        s.set(i.field, on(t, r, e));
    }
    return s;
}

/** A mutation that deletes the document at the given key. */ class Nn extends En {
    constructor(t, e) {
        super(), this.key = t, this.precondition = e, this.type = 2 /* Delete */ , this.fieldTransforms = [];
    }
}

class kn extends En {
    constructor(t, e) {
        super(), this.key = t, this.precondition = e, this.type = 3 /* Verify */ , this.fieldTransforms = [];
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Mn {
    // TODO(b/33078163): just use simplest form of existence filter for now
    constructor(t) {
        this.count = t;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Error Codes describing the different ways GRPC can fail. These are copied
 * directly from GRPC's sources here:
 *
 * https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
 *
 * Important! The names of these identifiers matter because the string forms
 * are used for reverse lookups from the webchannel stream. Do NOT change the
 * names of these identifiers or change this into a const enum.
 */ var On, Fn;

/**
 * Determines whether an error code represents a permanent error when received
 * in response to a non-write operation.
 *
 * See isPermanentWriteError for classifying write errors.
 */
function $n(t) {
    switch (t) {
      default:
        return U();

      case Q.CANCELLED:
      case Q.UNKNOWN:
      case Q.DEADLINE_EXCEEDED:
      case Q.RESOURCE_EXHAUSTED:
      case Q.INTERNAL:
      case Q.UNAVAILABLE:
 // Unauthenticated means something went wrong with our token and we need
        // to retry with new credentials which will happen automatically.
              case Q.UNAUTHENTICATED:
        return !1;

      case Q.INVALID_ARGUMENT:
      case Q.NOT_FOUND:
      case Q.ALREADY_EXISTS:
      case Q.PERMISSION_DENIED:
      case Q.FAILED_PRECONDITION:
 // Aborted might be retried in some scenarios, but that is dependant on
        // the context and should handled individually by the calling code.
        // See https://cloud.google.com/apis/design/errors.
              case Q.ABORTED:
      case Q.OUT_OF_RANGE:
      case Q.UNIMPLEMENTED:
      case Q.DATA_LOSS:
        return !0;
    }
}

/**
 * Determines whether an error code represents a permanent error when received
 * in response to a write operation.
 *
 * Write operations must be handled specially because as of b/119437764, ABORTED
 * errors on the write stream should be retried too (even though ABORTED errors
 * are not generally retryable).
 *
 * Note that during the initial handshake on the write stream an ABORTED error
 * signals that we should discard our stream token (i.e. it is permanent). This
 * means a handshake error should be classified with isPermanentError, above.
 */
/**
 * Maps an error Code from GRPC status code number, like 0, 1, or 14. These
 * are not the same as HTTP status codes.
 *
 * @returns The Code equivalent to the given GRPC status code. Fails if there
 *     is no match.
 */
function Bn(t) {
    if (void 0 === t) 
    // This shouldn't normally happen, but in certain error cases (like trying
    // to send invalid proto messages) we may get an error with no GRPC code.
    return $("GRPC error has no .code"), Q.UNKNOWN;
    switch (t) {
      case On.OK:
        return Q.OK;

      case On.CANCELLED:
        return Q.CANCELLED;

      case On.UNKNOWN:
        return Q.UNKNOWN;

      case On.DEADLINE_EXCEEDED:
        return Q.DEADLINE_EXCEEDED;

      case On.RESOURCE_EXHAUSTED:
        return Q.RESOURCE_EXHAUSTED;

      case On.INTERNAL:
        return Q.INTERNAL;

      case On.UNAVAILABLE:
        return Q.UNAVAILABLE;

      case On.UNAUTHENTICATED:
        return Q.UNAUTHENTICATED;

      case On.INVALID_ARGUMENT:
        return Q.INVALID_ARGUMENT;

      case On.NOT_FOUND:
        return Q.NOT_FOUND;

      case On.ALREADY_EXISTS:
        return Q.ALREADY_EXISTS;

      case On.PERMISSION_DENIED:
        return Q.PERMISSION_DENIED;

      case On.FAILED_PRECONDITION:
        return Q.FAILED_PRECONDITION;

      case On.ABORTED:
        return Q.ABORTED;

      case On.OUT_OF_RANGE:
        return Q.OUT_OF_RANGE;

      case On.UNIMPLEMENTED:
        return Q.UNIMPLEMENTED;

      case On.DATA_LOSS:
        return Q.DATA_LOSS;

      default:
        return U();
    }
}

/**
 * Converts an HTTP response's error status to the equivalent error code.
 *
 * @param status - An HTTP error response status ("FAILED_PRECONDITION",
 * "UNKNOWN", etc.)
 * @returns The equivalent Code. Non-matching responses are mapped to
 *     Code.UNKNOWN.
 */ (Fn = On || (On = {}))[Fn.OK = 0] = "OK", Fn[Fn.CANCELLED = 1] = "CANCELLED", 
Fn[Fn.UNKNOWN = 2] = "UNKNOWN", Fn[Fn.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", 
Fn[Fn.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", Fn[Fn.NOT_FOUND = 5] = "NOT_FOUND", 
Fn[Fn.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", Fn[Fn.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", 
Fn[Fn.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", Fn[Fn.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", 
Fn[Fn.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", Fn[Fn.ABORTED = 10] = "ABORTED", 
Fn[Fn.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", Fn[Fn.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", 
Fn[Fn.INTERNAL = 13] = "INTERNAL", Fn[Fn.UNAVAILABLE = 14] = "UNAVAILABLE", Fn[Fn.DATA_LOSS = 15] = "DATA_LOSS";

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A map implementation that uses objects as keys. Objects must have an
 * associated equals function and must be immutable. Entries in the map are
 * stored together with the key being produced from the mapKeyFn. This map
 * automatically handles collisions of keys.
 */
class Ln {
    constructor(t, e) {
        this.mapKeyFn = t, this.equalsFn = e, 
        /**
         * The inner map for a key/value pair. Due to the possibility of collisions we
         * keep a list of entries that we do a linear search through to find an actual
         * match. Note that collisions should be rare, so we still expect near
         * constant time lookups in practice.
         */
        this.inner = {}, 
        /** The number of entries stored in the map */
        this.innerSize = 0;
    }
    /** Get a value for this key, or undefined if it does not exist. */    get(t) {
        const e = this.mapKeyFn(t), n = this.inner[e];
        if (void 0 !== n) for (const [e, s] of n) if (this.equalsFn(e, t)) return s;
    }
    has(t) {
        return void 0 !== this.get(t);
    }
    /** Put this key and value in the map. */    set(t, e) {
        const n = this.mapKeyFn(t), s = this.inner[n];
        if (void 0 === s) return this.inner[n] = [ [ t, e ] ], void this.innerSize++;
        for (let n = 0; n < s.length; n++) if (this.equalsFn(s[n][0], t)) 
        // This is updating an existing entry and does not increase `innerSize`.
        return void (s[n] = [ t, e ]);
        s.push([ t, e ]), this.innerSize++;
    }
    /**
     * Remove this key from the map. Returns a boolean if anything was deleted.
     */    delete(t) {
        const e = this.mapKeyFn(t), n = this.inner[e];
        if (void 0 === n) return !1;
        for (let s = 0; s < n.length; s++) if (this.equalsFn(n[s][0], t)) return 1 === n.length ? delete this.inner[e] : n.splice(s, 1), 
        this.innerSize--, !0;
        return !1;
    }
    forEach(t) {
        ft(this.inner, ((e, n) => {
            for (const [e, s] of n) t(e, s);
        }));
    }
    isEmpty() {
        return dt(this.inner);
    }
    size() {
        return this.innerSize;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// An immutable sorted map implementation, based on a Left-leaning Red-Black
// tree.
class Un {
    constructor(t, e) {
        this.comparator = t, this.root = e || Kn.EMPTY;
    }
    // Returns a copy of the map, with the specified key/value added or replaced.
    insert(t, e) {
        return new Un(this.comparator, this.root.insert(t, e, this.comparator).copy(null, null, Kn.BLACK, null, null));
    }
    // Returns a copy of the map, with the specified key removed.
    remove(t) {
        return new Un(this.comparator, this.root.remove(t, this.comparator).copy(null, null, Kn.BLACK, null, null));
    }
    // Returns the value of the node with the given key, or null.
    get(t) {
        let e = this.root;
        for (;!e.isEmpty(); ) {
            const n = this.comparator(t, e.key);
            if (0 === n) return e.value;
            n < 0 ? e = e.left : n > 0 && (e = e.right);
        }
        return null;
    }
    // Returns the index of the element in this sorted map, or -1 if it doesn't
    // exist.
    indexOf(t) {
        // Number of nodes that were pruned when descending right
        let e = 0, n = this.root;
        for (;!n.isEmpty(); ) {
            const s = this.comparator(t, n.key);
            if (0 === s) return e + n.left.size;
            s < 0 ? n = n.left : (
            // Count all nodes left of the node plus the node itself
            e += n.left.size + 1, n = n.right);
        }
        // Node not found
                return -1;
    }
    isEmpty() {
        return this.root.isEmpty();
    }
    // Returns the total number of nodes in the map.
    get size() {
        return this.root.size;
    }
    // Returns the minimum key in the map.
    minKey() {
        return this.root.minKey();
    }
    // Returns the maximum key in the map.
    maxKey() {
        return this.root.maxKey();
    }
    // Traverses the map in key order and calls the specified action function
    // for each key/value pair. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    inorderTraversal(t) {
        return this.root.inorderTraversal(t);
    }
    forEach(t) {
        this.inorderTraversal(((e, n) => (t(e, n), !1)));
    }
    toString() {
        const t = [];
        return this.inorderTraversal(((e, n) => (t.push(`${e}:${n}`), !1))), `{${t.join(", ")}}`;
    }
    // Traverses the map in reverse key order and calls the specified action
    // function for each key/value pair. If action returns true, traversal is
    // aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    reverseTraversal(t) {
        return this.root.reverseTraversal(t);
    }
    // Returns an iterator over the SortedMap.
    getIterator() {
        return new qn(this.root, null, this.comparator, !1);
    }
    getIteratorFrom(t) {
        return new qn(this.root, t, this.comparator, !1);
    }
    getReverseIterator() {
        return new qn(this.root, null, this.comparator, !0);
    }
    getReverseIteratorFrom(t) {
        return new qn(this.root, t, this.comparator, !0);
    }
}

 // end SortedMap
// An iterator over an LLRBNode.
class qn {
    constructor(t, e, n, s) {
        this.isReverse = s, this.nodeStack = [];
        let i = 1;
        for (;!t.isEmpty(); ) if (i = e ? n(t.key, e) : 1, 
        // flip the comparison if we're going in reverse
        e && s && (i *= -1), i < 0) 
        // This node is less than our start key. ignore it
        t = this.isReverse ? t.left : t.right; else {
            if (0 === i) {
                // This node is exactly equal to our start key. Push it on the stack,
                // but stop iterating;
                this.nodeStack.push(t);
                break;
            }
            // This node is greater than our start key, add it to the stack and move
            // to the next one
            this.nodeStack.push(t), t = this.isReverse ? t.right : t.left;
        }
    }
    getNext() {
        let t = this.nodeStack.pop();
        const e = {
            key: t.key,
            value: t.value
        };
        if (this.isReverse) for (t = t.left; !t.isEmpty(); ) this.nodeStack.push(t), t = t.right; else for (t = t.right; !t.isEmpty(); ) this.nodeStack.push(t), 
        t = t.left;
        return e;
    }
    hasNext() {
        return this.nodeStack.length > 0;
    }
    peek() {
        if (0 === this.nodeStack.length) return null;
        const t = this.nodeStack[this.nodeStack.length - 1];
        return {
            key: t.key,
            value: t.value
        };
    }
}

 // end SortedMapIterator
// Represents a node in a Left-leaning Red-Black tree.
class Kn {
    constructor(t, e, n, s, i) {
        this.key = t, this.value = e, this.color = null != n ? n : Kn.RED, this.left = null != s ? s : Kn.EMPTY, 
        this.right = null != i ? i : Kn.EMPTY, this.size = this.left.size + 1 + this.right.size;
    }
    // Returns a copy of the current node, optionally replacing pieces of it.
    copy(t, e, n, s, i) {
        return new Kn(null != t ? t : this.key, null != e ? e : this.value, null != n ? n : this.color, null != s ? s : this.left, null != i ? i : this.right);
    }
    isEmpty() {
        return !1;
    }
    // Traverses the tree in key order and calls the specified action function
    // for each node. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    inorderTraversal(t) {
        return this.left.inorderTraversal(t) || t(this.key, this.value) || this.right.inorderTraversal(t);
    }
    // Traverses the tree in reverse key order and calls the specified action
    // function for each node. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    reverseTraversal(t) {
        return this.right.reverseTraversal(t) || t(this.key, this.value) || this.left.reverseTraversal(t);
    }
    // Returns the minimum node in the tree.
    min() {
        return this.left.isEmpty() ? this : this.left.min();
    }
    // Returns the maximum key in the tree.
    minKey() {
        return this.min().key;
    }
    // Returns the maximum key in the tree.
    maxKey() {
        return this.right.isEmpty() ? this.key : this.right.maxKey();
    }
    // Returns new tree, with the key/value added.
    insert(t, e, n) {
        let s = this;
        const i = n(t, s.key);
        return s = i < 0 ? s.copy(null, null, null, s.left.insert(t, e, n), null) : 0 === i ? s.copy(null, e, null, null, null) : s.copy(null, null, null, null, s.right.insert(t, e, n)), 
        s.fixUp();
    }
    removeMin() {
        if (this.left.isEmpty()) return Kn.EMPTY;
        let t = this;
        return t.left.isRed() || t.left.left.isRed() || (t = t.moveRedLeft()), t = t.copy(null, null, null, t.left.removeMin(), null), 
        t.fixUp();
    }
    // Returns new tree, with the specified item removed.
    remove(t, e) {
        let n, s = this;
        if (e(t, s.key) < 0) s.left.isEmpty() || s.left.isRed() || s.left.left.isRed() || (s = s.moveRedLeft()), 
        s = s.copy(null, null, null, s.left.remove(t, e), null); else {
            if (s.left.isRed() && (s = s.rotateRight()), s.right.isEmpty() || s.right.isRed() || s.right.left.isRed() || (s = s.moveRedRight()), 
            0 === e(t, s.key)) {
                if (s.right.isEmpty()) return Kn.EMPTY;
                n = s.right.min(), s = s.copy(n.key, n.value, null, null, s.right.removeMin());
            }
            s = s.copy(null, null, null, null, s.right.remove(t, e));
        }
        return s.fixUp();
    }
    isRed() {
        return this.color;
    }
    // Returns new tree after performing any needed rotations.
    fixUp() {
        let t = this;
        return t.right.isRed() && !t.left.isRed() && (t = t.rotateLeft()), t.left.isRed() && t.left.left.isRed() && (t = t.rotateRight()), 
        t.left.isRed() && t.right.isRed() && (t = t.colorFlip()), t;
    }
    moveRedLeft() {
        let t = this.colorFlip();
        return t.right.left.isRed() && (t = t.copy(null, null, null, null, t.right.rotateRight()), 
        t = t.rotateLeft(), t = t.colorFlip()), t;
    }
    moveRedRight() {
        let t = this.colorFlip();
        return t.left.left.isRed() && (t = t.rotateRight(), t = t.colorFlip()), t;
    }
    rotateLeft() {
        const t = this.copy(null, null, Kn.RED, null, this.right.left);
        return this.right.copy(null, null, this.color, t, null);
    }
    rotateRight() {
        const t = this.copy(null, null, Kn.RED, this.left.right, null);
        return this.left.copy(null, null, this.color, null, t);
    }
    colorFlip() {
        const t = this.left.copy(null, null, !this.left.color, null, null), e = this.right.copy(null, null, !this.right.color, null, null);
        return this.copy(null, null, !this.color, t, e);
    }
    // For testing.
    checkMaxDepth() {
        const t = this.check();
        return Math.pow(2, t) <= this.size + 1;
    }
    // In a balanced RB tree, the black-depth (number of black nodes) from root to
    // leaves is equal on both sides.  This function verifies that or asserts.
    check() {
        if (this.isRed() && this.left.isRed()) throw U();
        if (this.right.isRed()) throw U();
        const t = this.left.check();
        if (t !== this.right.check()) throw U();
        return t + (this.isRed() ? 0 : 1);
    }
}

 // end LLRBNode
// Empty node is shared between all LLRB trees.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Kn.EMPTY = null, Kn.RED = !0, Kn.BLACK = !1;

// end LLRBEmptyNode
Kn.EMPTY = new 
// Represents an empty node (a leaf node in the Red-Black Tree).
class {
    constructor() {
        this.size = 0;
    }
    get key() {
        throw U();
    }
    get value() {
        throw U();
    }
    get color() {
        throw U();
    }
    get left() {
        throw U();
    }
    get right() {
        throw U();
    }
    // Returns a copy of the current node.
    copy(t, e, n, s, i) {
        return this;
    }
    // Returns a copy of the tree, with the specified key/value added.
    insert(t, e, n) {
        return new Kn(t, e);
    }
    // Returns a copy of the tree, with the specified key removed.
    remove(t, e) {
        return this;
    }
    isEmpty() {
        return !0;
    }
    inorderTraversal(t) {
        return !1;
    }
    reverseTraversal(t) {
        return !1;
    }
    minKey() {
        return null;
    }
    maxKey() {
        return null;
    }
    isRed() {
        return !1;
    }
    // For testing.
    checkMaxDepth() {
        return !0;
    }
    check() {
        return 0;
    }
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * SortedSet is an immutable (copy-on-write) collection that holds elements
 * in order specified by the provided comparator.
 *
 * NOTE: if provided comparator returns 0 for two elements, we consider them to
 * be equal!
 */
class Gn {
    constructor(t) {
        this.comparator = t, this.data = new Un(this.comparator);
    }
    has(t) {
        return null !== this.data.get(t);
    }
    first() {
        return this.data.minKey();
    }
    last() {
        return this.data.maxKey();
    }
    get size() {
        return this.data.size;
    }
    indexOf(t) {
        return this.data.indexOf(t);
    }
    /** Iterates elements in order defined by "comparator" */    forEach(t) {
        this.data.inorderTraversal(((e, n) => (t(e), !1)));
    }
    /** Iterates over `elem`s such that: range[0] &lt;= elem &lt; range[1]. */    forEachInRange(t, e) {
        const n = this.data.getIteratorFrom(t[0]);
        for (;n.hasNext(); ) {
            const s = n.getNext();
            if (this.comparator(s.key, t[1]) >= 0) return;
            e(s.key);
        }
    }
    /**
     * Iterates over `elem`s such that: start &lt;= elem until false is returned.
     */    forEachWhile(t, e) {
        let n;
        for (n = void 0 !== e ? this.data.getIteratorFrom(e) : this.data.getIterator(); n.hasNext(); ) {
            if (!t(n.getNext().key)) return;
        }
    }
    /** Finds the least element greater than or equal to `elem`. */    firstAfterOrEqual(t) {
        const e = this.data.getIteratorFrom(t);
        return e.hasNext() ? e.getNext().key : null;
    }
    getIterator() {
        return new Qn(this.data.getIterator());
    }
    getIteratorFrom(t) {
        return new Qn(this.data.getIteratorFrom(t));
    }
    /** Inserts or updates an element */    add(t) {
        return this.copy(this.data.remove(t).insert(t, !0));
    }
    /** Deletes an element */    delete(t) {
        return this.has(t) ? this.copy(this.data.remove(t)) : this;
    }
    isEmpty() {
        return this.data.isEmpty();
    }
    unionWith(t) {
        let e = this;
        // Make sure `result` always refers to the larger one of the two sets.
                return e.size < t.size && (e = t, t = this), t.forEach((t => {
            e = e.add(t);
        })), e;
    }
    isEqual(t) {
        if (!(t instanceof Gn)) return !1;
        if (this.size !== t.size) return !1;
        const e = this.data.getIterator(), n = t.data.getIterator();
        for (;e.hasNext(); ) {
            const t = e.getNext().key, s = n.getNext().key;
            if (0 !== this.comparator(t, s)) return !1;
        }
        return !0;
    }
    toArray() {
        const t = [];
        return this.forEach((e => {
            t.push(e);
        })), t;
    }
    toString() {
        const t = [];
        return this.forEach((e => t.push(e))), "SortedSet(" + t.toString() + ")";
    }
    copy(t) {
        const e = new Gn(this.comparator);
        return e.data = t, e;
    }
}

class Qn {
    constructor(t) {
        this.iter = t;
    }
    getNext() {
        return this.iter.getNext().key;
    }
    hasNext() {
        return this.iter.hasNext();
    }
}

/**
 * Compares two sorted sets for equality using their natural ordering. The
 * method computes the intersection and invokes `onAdd` for every element that
 * is in `after` but not `before`. `onRemove` is invoked for every element in
 * `before` but missing from `after`.
 *
 * The method creates a copy of both `before` and `after` and runs in O(n log
 * n), where n is the size of the two lists.
 *
 * @param before - The elements that exist in the original set.
 * @param after - The elements to diff against the original set.
 * @param comparator - The comparator for the elements in before and after.
 * @param onAdd - A function to invoke for every element that is part of `
 * after` but not `before`.
 * @param onRemove - A function to invoke for every element that is part of
 * `before` but not `after`.
 */
/**
 * Returns the next element from the iterator or `undefined` if none available.
 */
function jn(t) {
    return t.hasNext() ? t.getNext() : void 0;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Wn = new Un(kt.comparator);

function zn() {
    return Wn;
}

const Hn = new Un(kt.comparator);

function Jn() {
    return Hn;
}

function Yn() {
    return new Ln((t => t.toString()), ((t, e) => t.isEqual(e)));
}

const Xn = new Un(kt.comparator);

const Zn = new Gn(kt.comparator);

function ts(...t) {
    let e = Zn;
    for (const n of t) e = e.add(n);
    return e;
}

const es = new Gn(ot);

function ns() {
    return es;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An event from the RemoteStore. It is split into targetChanges (changes to the
 * state or the set of documents in our watched targets) and documentUpdates
 * (changes to the actual documents).
 */ class ss {
    constructor(
    /**
     * The snapshot version this event brings us up to, or MIN if not set.
     */
    t, 
    /**
     * A map from target to changes to the target. See TargetChange.
     */
    e, 
    /**
     * A set of targets that is known to be inconsistent. Listens for these
     * targets should be re-established without resume tokens.
     */
    n, 
    /**
     * A set of which documents have changed or been deleted, along with the
     * doc's new values (if not deleted).
     */
    s, 
    /**
     * A set of which document updates are due only to limbo resolution targets.
     */
    i) {
        this.snapshotVersion = t, this.targetChanges = e, this.targetMismatches = n, this.documentUpdates = s, 
        this.resolvedLimboDocuments = i;
    }
    /**
     * HACK: Views require RemoteEvents in order to determine whether the view is
     * CURRENT, but secondary tabs don't receive remote events. So this method is
     * used to create a synthesized RemoteEvent that can be used to apply a
     * CURRENT status change to a View, for queries executed in a different tab.
     */
    // PORTING NOTE: Multi-tab only
    static createSynthesizedRemoteEventForCurrentChange(t, e) {
        const n = new Map;
        return n.set(t, is.createSynthesizedTargetChangeForCurrentChange(t, e)), new ss(ht.min(), n, ns(), zn(), ts());
    }
}

/**
 * A TargetChange specifies the set of changes for a specific target as part of
 * a RemoteEvent. These changes track which documents are added, modified or
 * removed, as well as the target's resume token and whether the target is
 * marked CURRENT.
 * The actual changes *to* documents are not part of the TargetChange since
 * documents may be part of multiple targets.
 */ class is {
    constructor(
    /**
     * An opaque, server-assigned token that allows watching a query to be resumed
     * after disconnecting without retransmitting all the data that matches the
     * query. The resume token essentially identifies a point in time from which
     * the server should resume sending results.
     */
    t, 
    /**
     * The "current" (synced) status of this target. Note that "current"
     * has special meaning in the RPC protocol that implies that a target is
     * both up-to-date and consistent with the rest of the watch stream.
     */
    e, 
    /**
     * The set of documents that were newly assigned to this target as part of
     * this remote event.
     */
    n, 
    /**
     * The set of documents that were already assigned to this target but received
     * an update during this remote event.
     */
    s, 
    /**
     * The set of documents that were removed from this target as part of this
     * remote event.
     */
    i) {
        this.resumeToken = t, this.current = e, this.addedDocuments = n, this.modifiedDocuments = s, 
        this.removedDocuments = i;
    }
    /**
     * This method is used to create a synthesized TargetChanges that can be used to
     * apply a CURRENT status change to a View (for queries executed in a different
     * tab) or for new queries (to raise snapshots with correct CURRENT status).
     */    static createSynthesizedTargetChangeForCurrentChange(t, e) {
        return new is(Tt.EMPTY_BYTE_STRING, e, ts(), ts(), ts());
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Represents a changed document and a list of target ids to which this change
 * applies.
 *
 * If document has been deleted NoDocument will be provided.
 */ class rs {
    constructor(
    /** The new document applies to all of these targets. */
    t, 
    /** The new document is removed from all of these targets. */
    e, 
    /** The key of the document for this change. */
    n, 
    /**
     * The new document or NoDocument if it was deleted. Is null if the
     * document went out of view without the server sending a new document.
     */
    s) {
        this.O = t, this.removedTargetIds = e, this.key = n, this.F = s;
    }
}

class os {
    constructor(t, e) {
        this.targetId = t, this.$ = e;
    }
}

class us {
    constructor(
    /** What kind of change occurred to the watch target. */
    t, 
    /** The target IDs that were added/removed/set. */
    e, 
    /**
     * An opaque, server-assigned token that allows watching a target to be
     * resumed after disconnecting without retransmitting all the data that
     * matches the target. The resume token essentially identifies a point in
     * time from which the server should resume sending results.
     */
    n = Tt.EMPTY_BYTE_STRING
    /** An RPC error indicating why the watch failed. */ , s = null) {
        this.state = t, this.targetIds = e, this.resumeToken = n, this.cause = s;
    }
}

/** Tracks the internal state of a Watch target. */ class as {
    constructor() {
        /**
         * The number of pending responses (adds or removes) that we are waiting on.
         * We only consider targets active that have no pending responses.
         */
        this.B = 0, 
        /**
         * Keeps track of the document changes since the last raised snapshot.
         *
         * These changes are continuously updated as we receive document updates and
         * always reflect the current set of changes against the last issued snapshot.
         */
        this.L = ls(), 
        /** See public getters for explanations of these fields. */
        this.U = Tt.EMPTY_BYTE_STRING, this.q = !1, 
        /**
         * Whether this target state should be included in the next snapshot. We
         * initialize to true so that newly-added targets are included in the next
         * RemoteEvent.
         */
        this.K = !0;
    }
    /**
     * Whether this target has been marked 'current'.
     *
     * 'Current' has special meaning in the RPC protocol: It implies that the
     * Watch backend has sent us all changes up to the point at which the target
     * was added and that the target is consistent with the rest of the watch
     * stream.
     */    get current() {
        return this.q;
    }
    /** The last resume token sent to us for this target. */    get resumeToken() {
        return this.U;
    }
    /** Whether this target has pending target adds or target removes. */    get G() {
        return 0 !== this.B;
    }
    /** Whether we have modified any state that should trigger a snapshot. */    get j() {
        return this.K;
    }
    /**
     * Applies the resume token to the TargetChange, but only when it has a new
     * value. Empty resumeTokens are discarded.
     */    W(t) {
        t.approximateByteSize() > 0 && (this.K = !0, this.U = t);
    }
    /**
     * Creates a target change from the current set of changes.
     *
     * To reset the document changes after raising this snapshot, call
     * `clearPendingChanges()`.
     */    H() {
        let t = ts(), e = ts(), n = ts();
        return this.L.forEach(((s, i) => {
            switch (i) {
              case 0 /* Added */ :
                t = t.add(s);
                break;

              case 2 /* Modified */ :
                e = e.add(s);
                break;

              case 1 /* Removed */ :
                n = n.add(s);
                break;

              default:
                U();
            }
        })), new is(this.U, this.q, t, e, n);
    }
    /**
     * Resets the document changes and sets `hasPendingChanges` to false.
     */    J() {
        this.K = !1, this.L = ls();
    }
    Y(t, e) {
        this.K = !0, this.L = this.L.insert(t, e);
    }
    X(t) {
        this.K = !0, this.L = this.L.remove(t);
    }
    Z() {
        this.B += 1;
    }
    tt() {
        this.B -= 1;
    }
    et() {
        this.K = !0, this.q = !0;
    }
}

/**
 * A helper class to accumulate watch changes into a RemoteEvent.
 */
class cs {
    constructor(t) {
        this.nt = t, 
        /** The internal state of all tracked targets. */
        this.st = new Map, 
        /** Keeps track of the documents to update since the last raised snapshot. */
        this.it = zn(), 
        /** A mapping of document keys to their set of target IDs. */
        this.rt = hs(), 
        /**
         * A list of targets with existence filter mismatches. These targets are
         * known to be inconsistent and their listens needs to be re-established by
         * RemoteStore.
         */
        this.ot = new Gn(ot);
    }
    /**
     * Processes and adds the DocumentWatchChange to the current set of changes.
     */    ut(t) {
        for (const e of t.O) t.F && t.F.isFoundDocument() ? this.at(e, t.F) : this.ct(e, t.key, t.F);
        for (const e of t.removedTargetIds) this.ct(e, t.key, t.F);
    }
    /** Processes and adds the WatchTargetChange to the current set of changes. */    ht(t) {
        this.forEachTarget(t, (e => {
            const n = this.lt(e);
            switch (t.state) {
              case 0 /* NoChange */ :
                this.ft(e) && n.W(t.resumeToken);
                break;

              case 1 /* Added */ :
                // We need to decrement the number of pending acks needed from watch
                // for this targetId.
                n.tt(), n.G || 
                // We have a freshly added target, so we need to reset any state
                // that we had previously. This can happen e.g. when remove and add
                // back a target for existence filter mismatches.
                n.J(), n.W(t.resumeToken);
                break;

              case 2 /* Removed */ :
                // We need to keep track of removed targets to we can post-filter and
                // remove any target changes.
                // We need to decrement the number of pending acks needed from watch
                // for this targetId.
                n.tt(), n.G || this.removeTarget(e);
                break;

              case 3 /* Current */ :
                this.ft(e) && (n.et(), n.W(t.resumeToken));
                break;

              case 4 /* Reset */ :
                this.ft(e) && (
                // Reset the target and synthesizes removes for all existing
                // documents. The backend will re-add any documents that still
                // match the target before it sends the next global snapshot.
                this.dt(e), n.W(t.resumeToken));
                break;

              default:
                U();
            }
        }));
    }
    /**
     * Iterates over all targetIds that the watch change applies to: either the
     * targetIds explicitly listed in the change or the targetIds of all currently
     * active targets.
     */    forEachTarget(t, e) {
        t.targetIds.length > 0 ? t.targetIds.forEach(e) : this.st.forEach(((t, n) => {
            this.ft(n) && e(n);
        }));
    }
    /**
     * Handles existence filters and synthesizes deletes for filter mismatches.
     * Targets that are invalidated by filter mismatches are added to
     * `pendingTargetResets`.
     */    _t(t) {
        const e = t.targetId, n = t.$.count, s = this.wt(e);
        if (s) {
            const t = s.target;
            if (pe(t)) if (0 === n) {
                // The existence filter told us the document does not exist. We deduce
                // that this document does not exist and apply a deleted document to
                // our updates. Without applying this deleted document there might be
                // another query that will raise this document as part of a snapshot
                // until it is resolved, essentially exposing inconsistency between
                // queries.
                const n = new kt(t.path);
                this.ct(e, n, ie.newNoDocument(n, ht.min()));
            } else q(1 === n); else {
                this.gt(e) !== n && (
                // Existence filter mismatch: We reset the mapping and raise a new
                // snapshot with `isFromCache:true`.
                this.dt(e), this.ot = this.ot.add(e));
            }
        }
    }
    /**
     * Converts the currently accumulated state into a remote event at the
     * provided snapshot version. Resets the accumulated changes before returning.
     */    yt(t) {
        const e = new Map;
        this.st.forEach(((n, s) => {
            const i = this.wt(s);
            if (i) {
                if (n.current && pe(i.target)) {
                    // Document queries for document that don't exist can produce an empty
                    // result set. To update our local cache, we synthesize a document
                    // delete if we have not previously received the document. This
                    // resolves the limbo state of the document, removing it from
                    // limboDocumentRefs.
                    // TODO(dimond): Ideally we would have an explicit lookup target
                    // instead resulting in an explicit delete message and we could
                    // remove this special logic.
                    const e = new kt(i.target.path);
                    null !== this.it.get(e) || this.It(s, e) || this.ct(s, e, ie.newNoDocument(e, t));
                }
                n.j && (e.set(s, n.H()), n.J());
            }
        }));
        let n = ts();
        // We extract the set of limbo-only document updates as the GC logic
        // special-cases documents that do not appear in the target cache.
        
        // TODO(gsoltis): Expand on this comment once GC is available in the JS
        // client.
                this.rt.forEach(((t, e) => {
            let s = !0;
            e.forEachWhile((t => {
                const e = this.wt(t);
                return !e || 2 /* LimboResolution */ === e.purpose || (s = !1, !1);
            })), s && (n = n.add(t));
        })), this.it.forEach(((e, n) => n.setReadTime(t)));
        const s = new ss(t, e, this.ot, this.it, n);
        return this.it = zn(), this.rt = hs(), this.ot = new Gn(ot), s;
    }
    /**
     * Adds the provided document to the internal list of document updates and
     * its document key to the given target's mapping.
     */
    // Visible for testing.
    at(t, e) {
        if (!this.ft(t)) return;
        const n = this.It(t, e.key) ? 2 /* Modified */ : 0 /* Added */;
        this.lt(t).Y(e.key, n), this.it = this.it.insert(e.key, e), this.rt = this.rt.insert(e.key, this.Tt(e.key).add(t));
    }
    /**
     * Removes the provided document from the target mapping. If the
     * document no longer matches the target, but the document's state is still
     * known (e.g. we know that the document was deleted or we received the change
     * that caused the filter mismatch), the new document can be provided
     * to update the remote document cache.
     */
    // Visible for testing.
    ct(t, e, n) {
        if (!this.ft(t)) return;
        const s = this.lt(t);
        this.It(t, e) ? s.Y(e, 1 /* Removed */) : 
        // The document may have entered and left the target before we raised a
        // snapshot, so we can just ignore the change.
        s.X(e), this.rt = this.rt.insert(e, this.Tt(e).delete(t)), n && (this.it = this.it.insert(e, n));
    }
    removeTarget(t) {
        this.st.delete(t);
    }
    /**
     * Returns the current count of documents in the target. This includes both
     * the number of documents that the LocalStore considers to be part of the
     * target as well as any accumulated changes.
     */    gt(t) {
        const e = this.lt(t).H();
        return this.nt.getRemoteKeysForTarget(t).size + e.addedDocuments.size - e.removedDocuments.size;
    }
    /**
     * Increment the number of acks needed from watch before we can consider the
     * server to be 'in-sync' with the client's active targets.
     */    Z(t) {
        this.lt(t).Z();
    }
    lt(t) {
        let e = this.st.get(t);
        return e || (e = new as, this.st.set(t, e)), e;
    }
    Tt(t) {
        let e = this.rt.get(t);
        return e || (e = new Gn(ot), this.rt = this.rt.insert(t, e)), e;
    }
    /**
     * Verifies that the user is still interested in this target (by calling
     * `getTargetDataForTarget()`) and that we are not waiting for pending ADDs
     * from watch.
     */    ft(t) {
        const e = null !== this.wt(t);
        return e || F("WatchChangeAggregator", "Detected inactive target", t), e;
    }
    /**
     * Returns the TargetData for an active target (i.e. a target that the user
     * is still interested in that has no outstanding target change requests).
     */    wt(t) {
        const e = this.st.get(t);
        return e && e.G ? null : this.nt.Et(t);
    }
    /**
     * Resets the state of a Watch target to its initial state (e.g. sets
     * 'current' to false, clears the resume token and removes its target mapping
     * from all documents).
     */    dt(t) {
        this.st.set(t, new as);
        this.nt.getRemoteKeysForTarget(t).forEach((e => {
            this.ct(t, e, /*updatedDocument=*/ null);
        }));
    }
    /**
     * Returns whether the LocalStore considers the document to be part of the
     * specified target.
     */    It(t, e) {
        return this.nt.getRemoteKeysForTarget(t).has(e);
    }
}

function hs() {
    return new Un(kt.comparator);
}

function ls() {
    return new Un(kt.comparator);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const fs = (() => {
    const t = {
        asc: "ASCENDING",
        desc: "DESCENDING"
    };
    return t;
})(), ds = (() => {
    const t = {
        "<": "LESS_THAN",
        "<=": "LESS_THAN_OR_EQUAL",
        ">": "GREATER_THAN",
        ">=": "GREATER_THAN_OR_EQUAL",
        "==": "EQUAL",
        "!=": "NOT_EQUAL",
        "array-contains": "ARRAY_CONTAINS",
        in: "IN",
        "not-in": "NOT_IN",
        "array-contains-any": "ARRAY_CONTAINS_ANY"
    };
    return t;
})();

/**
 * This class generates JsonObject values for the Datastore API suitable for
 * sending to either GRPC stub methods or via the JSON/HTTP REST API.
 *
 * The serializer supports both Protobuf.js and Proto3 JSON formats. By
 * setting `useProto3Json` to true, the serializer will use the Proto3 JSON
 * format.
 *
 * For a description of the Proto3 JSON format check
 * https://developers.google.com/protocol-buffers/docs/proto3#json
 *
 * TODO(klimt): We can remove the databaseId argument if we keep the full
 * resource name in documents.
 */
class _s {
    constructor(t, e) {
        this.databaseId = t, this.N = e;
    }
}

/**
 * Returns a value for a Date that's appropriate to put into a proto.
 */
function ws(t, e) {
    if (t.N) {
        return `${new Date(1e3 * e.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "")}.${("000000000" + e.nanoseconds).slice(-9)}Z`;
    }
    return {
        seconds: "" + e.seconds,
        nanos: e.nanoseconds
    };
}

/**
 * Returns a value for bytes that's appropriate to put in a proto.
 *
 * Visible for testing.
 */
function ms(t, e) {
    return t.N ? e.toBase64() : e.toUint8Array();
}

/**
 * Returns a ByteString based on the proto string value.
 */ function gs(t, e) {
    return ws(t, e.toTimestamp());
}

function ys(t) {
    return q(!!t), ht.fromTimestamp(function(t) {
        const e = At(t);
        return new ct(e.seconds, e.nanos);
    }(t));
}

function ps(t, e) {
    return function(t) {
        return new wt([ "projects", t.projectId, "databases", t.database ]);
    }(t).child("documents").child(e).canonicalString();
}

function Is(t) {
    const e = wt.fromString(t);
    return q(js(e)), e;
}

function Ts(t, e) {
    return ps(t.databaseId, e.path);
}

function Es(t, e) {
    const n = Is(e);
    if (n.get(1) !== t.databaseId.projectId) throw new j(Q.INVALID_ARGUMENT, "Tried to deserialize key from different project: " + n.get(1) + " vs " + t.databaseId.projectId);
    if (n.get(3) !== t.databaseId.database) throw new j(Q.INVALID_ARGUMENT, "Tried to deserialize key from different database: " + n.get(3) + " vs " + t.databaseId.database);
    return new kt(bs(n));
}

function As(t, e) {
    return ps(t.databaseId, e);
}

function Rs(t) {
    const e = Is(t);
    // In v1beta1 queries for collections at the root did not have a trailing
    // "/documents". In v1 all resource paths contain "/documents". Preserve the
    // ability to read the v1beta1 form for compatibility with queries persisted
    // in the local target cache.
        return 4 === e.length ? wt.emptyPath() : bs(e);
}

function Ps(t) {
    return new wt([ "projects", t.databaseId.projectId, "databases", t.databaseId.database ]).canonicalString();
}

function bs(t) {
    return q(t.length > 4 && "documents" === t.get(4)), t.popFirst(5);
}

/** Creates a Document proto from key and fields (but no create/update time) */ function Vs(t, e, n) {
    return {
        name: Ts(t, e),
        fields: n.value.mapValue.fields
    };
}

function vs(t, e, n) {
    const s = Es(t, e.name), i = ys(e.updateTime), r = new ne({
        mapValue: {
            fields: e.fields
        }
    }), o = ie.newFoundDocument(s, i, r);
    return n && o.setHasCommittedMutations(), n ? o.setHasCommittedMutations() : o;
}

function Ss(t, e) {
    return "found" in e ? function(t, e) {
        q(!!e.found), e.found.name, e.found.updateTime;
        const n = Es(t, e.found.name), s = ys(e.found.updateTime), i = new ne({
            mapValue: {
                fields: e.found.fields
            }
        });
        return ie.newFoundDocument(n, s, i);
    }(t, e) : "missing" in e ? function(t, e) {
        q(!!e.missing), q(!!e.readTime);
        const n = Es(t, e.missing), s = ys(e.readTime);
        return ie.newNoDocument(n, s);
    }(t, e) : U();
}

function Ds(t, e) {
    let n;
    if ("targetChange" in e) {
        e.targetChange;
        // proto3 default value is unset in JSON (undefined), so use 'NO_CHANGE'
        // if unset
        const s = function(t) {
            return "NO_CHANGE" === t ? 0 /* NoChange */ : "ADD" === t ? 1 /* Added */ : "REMOVE" === t ? 2 /* Removed */ : "CURRENT" === t ? 3 /* Current */ : "RESET" === t ? 4 /* Reset */ : U();
        }(e.targetChange.targetChangeType || "NO_CHANGE"), i = e.targetChange.targetIds || [], r = function(t, e) {
            return t.N ? (q(void 0 === e || "string" == typeof e), Tt.fromBase64String(e || "")) : (q(void 0 === e || e instanceof Uint8Array), 
            Tt.fromUint8Array(e || new Uint8Array));
        }(t, e.targetChange.resumeToken), o = e.targetChange.cause, u = o && function(t) {
            const e = void 0 === t.code ? Q.UNKNOWN : Bn(t.code);
            return new j(e, t.message || "");
        }
        /**
 * Returns a value for a number (or null) that's appropriate to put into
 * a google.protobuf.Int32Value proto.
 * DO NOT USE THIS FOR ANYTHING ELSE.
 * This method cheats. It's typed as returning "number" because that's what
 * our generated proto interfaces say Int32Value must be. But GRPC actually
 * expects a { value: <number> } struct.
 */ (o);
        n = new us(s, i, r, u || null);
    } else if ("documentChange" in e) {
        e.documentChange;
        const s = e.documentChange;
        s.document, s.document.name, s.document.updateTime;
        const i = Es(t, s.document.name), r = ys(s.document.updateTime), o = new ne({
            mapValue: {
                fields: s.document.fields
            }
        }), u = ie.newFoundDocument(i, r, o), a = s.targetIds || [], c = s.removedTargetIds || [];
        n = new rs(a, c, u.key, u);
    } else if ("documentDelete" in e) {
        e.documentDelete;
        const s = e.documentDelete;
        s.document;
        const i = Es(t, s.document), r = s.readTime ? ys(s.readTime) : ht.min(), o = ie.newNoDocument(i, r), u = s.removedTargetIds || [];
        n = new rs([], u, o.key, o);
    } else if ("documentRemove" in e) {
        e.documentRemove;
        const s = e.documentRemove;
        s.document;
        const i = Es(t, s.document), r = s.removedTargetIds || [];
        n = new rs([], r, i, null);
    } else {
        if (!("filter" in e)) return U();
        {
            e.filter;
            const t = e.filter;
            t.targetId;
            const s = t.count || 0, i = new Mn(s), r = t.targetId;
            n = new os(r, i);
        }
    }
    return n;
}

function Cs(t, e) {
    let n;
    if (e instanceof vn) n = {
        update: Vs(t, e.key, e.value)
    }; else if (e instanceof Nn) n = {
        delete: Ts(t, e.key)
    }; else if (e instanceof Sn) n = {
        update: Vs(t, e.key, e.data),
        updateMask: Qs(e.fieldMask)
    }; else {
        if (!(e instanceof kn)) return U();
        n = {
            verify: Ts(t, e.key)
        };
    }
    return e.fieldTransforms.length > 0 && (n.updateTransforms = e.fieldTransforms.map((t => function(t, e) {
        const n = e.transform;
        if (n instanceof cn) return {
            fieldPath: e.field.canonicalString(),
            setToServerValue: "REQUEST_TIME"
        };
        if (n instanceof hn) return {
            fieldPath: e.field.canonicalString(),
            appendMissingElements: {
                values: n.elements
            }
        };
        if (n instanceof fn) return {
            fieldPath: e.field.canonicalString(),
            removeAllFromArray: {
                values: n.elements
            }
        };
        if (n instanceof _n) return {
            fieldPath: e.field.canonicalString(),
            increment: n.k
        };
        throw U();
    }(0, t)))), e.precondition.isNone || (n.currentDocument = function(t, e) {
        return void 0 !== e.updateTime ? {
            updateTime: gs(t, e.updateTime)
        } : void 0 !== e.exists ? {
            exists: e.exists
        } : U();
    }(t, e.precondition)), n;
}

function xs(t, e) {
    const n = e.currentDocument ? function(t) {
        return void 0 !== t.updateTime ? In.updateTime(ys(t.updateTime)) : void 0 !== t.exists ? In.exists(t.exists) : In.none();
    }(e.currentDocument) : In.none(), s = e.updateTransforms ? e.updateTransforms.map((e => function(t, e) {
        let n = null;
        if ("setToServerValue" in e) q("REQUEST_TIME" === e.setToServerValue), n = new cn; else if ("appendMissingElements" in e) {
            const t = e.appendMissingElements.values || [];
            n = new hn(t);
        } else if ("removeAllFromArray" in e) {
            const t = e.removeAllFromArray.values || [];
            n = new fn(t);
        } else "increment" in e ? n = new _n(t, e.increment) : U();
        const s = gt.fromServerFormat(e.fieldPath);
        return new gn(s, n);
    }(t, e))) : [];
    if (e.update) {
        e.update.name;
        const i = Es(t, e.update.name), r = new ne({
            mapValue: {
                fields: e.update.fields
            }
        });
        if (e.updateMask) {
            const t = function(t) {
                const e = t.fieldPaths || [];
                return new yt(e.map((t => gt.fromServerFormat(t))));
            }(e.updateMask);
            return new Sn(i, r, t, n, s);
        }
        return new vn(i, r, n, s);
    }
    if (e.delete) {
        const s = Es(t, e.delete);
        return new Nn(s, n);
    }
    if (e.verify) {
        const s = Es(t, e.verify);
        return new kn(s, n);
    }
    return U();
}

function Ns(t, e) {
    return t && t.length > 0 ? (q(void 0 !== e), t.map((t => function(t, e) {
        // NOTE: Deletes don't have an updateTime.
        let n = t.updateTime ? ys(t.updateTime) : ys(e);
        return n.isEqual(ht.min()) && (
        // The Firestore Emulator currently returns an update time of 0 for
        // deletes of non-existing documents (rather than null). This breaks the
        // test "get deleted doc while offline with source=cache" as NoDocuments
        // with version 0 are filtered by IndexedDb's RemoteDocumentCache.
        // TODO(#2149): Remove this when Emulator is fixed
        n = ys(e)), new pn(n, t.transformResults || []);
    }(t, e)))) : [];
}

function ks(t, e) {
    return {
        documents: [ As(t, e.path) ]
    };
}

function Ms(t, e) {
    // Dissect the path into parent, collectionId, and optional key filter.
    const n = {
        structuredQuery: {}
    }, s = e.path;
    null !== e.collectionGroup ? (n.parent = As(t, s), n.structuredQuery.from = [ {
        collectionId: e.collectionGroup,
        allDescendants: !0
    } ]) : (n.parent = As(t, s.popLast()), n.structuredQuery.from = [ {
        collectionId: s.lastSegment()
    } ]);
    const i = function(t) {
        if (0 === t.length) return;
        const e = t.map((t => 
        // visible for testing
        function(t) {
            if ("==" /* EQUAL */ === t.op) {
                if (zt(t.value)) return {
                    unaryFilter: {
                        field: Us(t.field),
                        op: "IS_NAN"
                    }
                };
                if (Wt(t.value)) return {
                    unaryFilter: {
                        field: Us(t.field),
                        op: "IS_NULL"
                    }
                };
            } else if ("!=" /* NOT_EQUAL */ === t.op) {
                if (zt(t.value)) return {
                    unaryFilter: {
                        field: Us(t.field),
                        op: "IS_NOT_NAN"
                    }
                };
                if (Wt(t.value)) return {
                    unaryFilter: {
                        field: Us(t.field),
                        op: "IS_NOT_NULL"
                    }
                };
            }
            return {
                fieldFilter: {
                    field: Us(t.field),
                    op: Ls(t.op),
                    value: t.value
                }
            };
        }(t)));
        if (1 === e.length) return e[0];
        return {
            compositeFilter: {
                op: "AND",
                filters: e
            }
        };
    }(e.filters);
    i && (n.structuredQuery.where = i);
    const r = function(t) {
        if (0 === t.length) return;
        return t.map((t => 
        // visible for testing
        function(t) {
            return {
                field: Us(t.field),
                direction: Bs(t.dir)
            };
        }(t)));
    }(e.orderBy);
    r && (n.structuredQuery.orderBy = r);
    const o = function(t, e) {
        return t.N || Ct(e) ? e : {
            value: e
        };
    }
    /**
 * Returns a number (or null) from a google.protobuf.Int32Value proto.
 */ (t, e.limit);
    var u;
    return null !== o && (n.structuredQuery.limit = o), e.startAt && (n.structuredQuery.startAt = {
        before: (u = e.startAt).inclusive,
        values: u.position
    }), e.endAt && (n.structuredQuery.endAt = function(t) {
        return {
            before: !t.inclusive,
            values: t.position
        };
    }(e.endAt)), n;
}

function Os(t) {
    let e = Rs(t.parent);
    const n = t.structuredQuery, s = n.from ? n.from.length : 0;
    let i = null;
    if (s > 0) {
        q(1 === s);
        const t = n.from[0];
        t.allDescendants ? i = t.collectionId : e = e.child(t.collectionId);
    }
    let r = [];
    n.where && (r = $s(n.where));
    let o = [];
    n.orderBy && (o = n.orderBy.map((t => function(t) {
        return new Ne(qs(t.field), 
        // visible for testing
        function(t) {
            switch (t) {
              case "ASCENDING":
                return "asc" /* ASCENDING */;

              case "DESCENDING":
                return "desc" /* DESCENDING */;

              default:
                return;
            }
        }
        // visible for testing
        (t.direction));
    }(t))));
    let u = null;
    n.limit && (u = function(t) {
        let e;
        return e = "object" == typeof t ? t.value : t, Ct(e) ? null : e;
    }(n.limit));
    let a = null;
    n.startAt && (a = function(t) {
        const e = !!t.before, n = t.values || [];
        return new xe(n, e);
    }(n.startAt));
    let c = null;
    return n.endAt && (c = function(t) {
        const e = !t.before, n = t.values || [];
        return new xe(n, e);
    }
    // visible for testing
    (n.endAt)), $e(e, i, o, r, u, "F" /* First */ , a, c);
}

function Fs(t, e) {
    const n = function(t, e) {
        switch (e) {
          case 0 /* Listen */ :
            return null;

          case 1 /* ExistenceFilterMismatch */ :
            return "existence-filter-mismatch";

          case 2 /* LimboResolution */ :
            return "limbo-document";

          default:
            return U();
        }
    }(0, e.purpose);
    return null == n ? null : {
        "goog-listen-tags": n
    };
}

function $s(t) {
    return t ? void 0 !== t.unaryFilter ? [ Gs(t) ] : void 0 !== t.fieldFilter ? [ Ks(t) ] : void 0 !== t.compositeFilter ? t.compositeFilter.filters.map((t => $s(t))).reduce(((t, e) => t.concat(e))) : U() : [];
}

function Bs(t) {
    return fs[t];
}

function Ls(t) {
    return ds[t];
}

function Us(t) {
    return {
        fieldPath: t.canonicalString()
    };
}

function qs(t) {
    return gt.fromServerFormat(t.fieldPath);
}

function Ks(t) {
    return Ae.create(qs(t.fieldFilter.field), function(t) {
        switch (t) {
          case "EQUAL":
            return "==" /* EQUAL */;

          case "NOT_EQUAL":
            return "!=" /* NOT_EQUAL */;

          case "GREATER_THAN":
            return ">" /* GREATER_THAN */;

          case "GREATER_THAN_OR_EQUAL":
            return ">=" /* GREATER_THAN_OR_EQUAL */;

          case "LESS_THAN":
            return "<" /* LESS_THAN */;

          case "LESS_THAN_OR_EQUAL":
            return "<=" /* LESS_THAN_OR_EQUAL */;

          case "ARRAY_CONTAINS":
            return "array-contains" /* ARRAY_CONTAINS */;

          case "IN":
            return "in" /* IN */;

          case "NOT_IN":
            return "not-in" /* NOT_IN */;

          case "ARRAY_CONTAINS_ANY":
            return "array-contains-any" /* ARRAY_CONTAINS_ANY */;

          default:
            return U();
        }
    }(t.fieldFilter.op), t.fieldFilter.value);
}

function Gs(t) {
    switch (t.unaryFilter.op) {
      case "IS_NAN":
        const e = qs(t.unaryFilter.field);
        return Ae.create(e, "==" /* EQUAL */ , {
            doubleValue: NaN
        });

      case "IS_NULL":
        const n = qs(t.unaryFilter.field);
        return Ae.create(n, "==" /* EQUAL */ , {
            nullValue: "NULL_VALUE"
        });

      case "IS_NOT_NAN":
        const s = qs(t.unaryFilter.field);
        return Ae.create(s, "!=" /* NOT_EQUAL */ , {
            doubleValue: NaN
        });

      case "IS_NOT_NULL":
        const i = qs(t.unaryFilter.field);
        return Ae.create(i, "!=" /* NOT_EQUAL */ , {
            nullValue: "NULL_VALUE"
        });

      default:
        return U();
    }
}

function Qs(t) {
    const e = [];
    return t.fields.forEach((t => e.push(t.canonicalString()))), {
        fieldPaths: e
    };
}

function js(t) {
    // Resource names have at least 4 components (project ID, database ID)
    return t.length >= 4 && "projects" === t.get(0) && "databases" === t.get(2);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Encodes a resource path into a IndexedDb-compatible string form.
 */
function Ws(t) {
    let e = "";
    for (let n = 0; n < t.length; n++) e.length > 0 && (e = Hs(e)), e = zs(t.get(n), e);
    return Hs(e);
}

/** Encodes a single segment of a resource path into the given result */ function zs(t, e) {
    let n = e;
    const s = t.length;
    for (let e = 0; e < s; e++) {
        const s = t.charAt(e);
        switch (s) {
          case "\0":
            n += "";
            break;

          case "":
            n += "";
            break;

          default:
            n += s;
        }
    }
    return n;
}

/** Encodes a path separator into the given result */ function Hs(t) {
    return t + "";
}

/**
 * Decodes the given IndexedDb-compatible string form of a resource path into
 * a ResourcePath instance. Note that this method is not suitable for use with
 * decoding resource names from the server; those are One Platform format
 * strings.
 */ function Js(t) {
    // Event the empty path must encode as a path of at least length 2. A path
    // with exactly 2 must be the empty path.
    const e = t.length;
    if (q(e >= 2), 2 === e) return q("" === t.charAt(0) && "" === t.charAt(1)), wt.emptyPath();
    // Escape characters cannot exist past the second-to-last position in the
    // source value.
        const n = e - 2, s = [];
    let i = "";
    for (let r = 0; r < e; ) {
        // The last two characters of a valid encoded path must be a separator, so
        // there must be an end to this segment.
        const e = t.indexOf("", r);
        (e < 0 || e > n) && U();
        switch (t.charAt(e + 1)) {
          case "":
            const n = t.substring(r, e);
            let o;
            0 === i.length ? 
            // Avoid copying for the common case of a segment that excludes \0
            // and \001
            o = n : (i += n, o = i, i = ""), s.push(o);
            break;

          case "":
            i += t.substring(r, e), i += "\0";
            break;

          case "":
            // The escape character can be used in the output to encode itself.
            i += t.substring(r, e + 1);
            break;

          default:
            U();
        }
        r = e + 2;
    }
    return new wt(s);
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Ys = [ "userId", "batchId" ];

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Name of the IndexedDb object store.
 *
 * Note that the name 'owner' is chosen to ensure backwards compatibility with
 * older clients that only supported single locked access to the persistence
 * layer.
 */
/**
 * Creates a [userId, encodedPath] key for use in the DbDocumentMutations
 * index to iterate over all at document mutations for a given path or lower.
 */
function Xs(t, e) {
    return [ t, Ws(e) ];
}

/**
 * Creates a full index key of [userId, encodedPath, batchId] for inserting
 * and deleting into the DbDocumentMutations index.
 */ function Zs(t, e, n) {
    return [ t, Ws(e), n ];
}

/**
 * Because we store all the useful information for this store in the key,
 * there is no useful information to store as the value. The raw (unencoded)
 * path cannot be stored because IndexedDb doesn't store prototype
 * information.
 */ const ti = {}, ei = [ "prefixPath", "collectionGroup", "readTime", "documentId" ], ni = [ "prefixPath", "collectionGroup", "documentId" ], si = [ "collectionGroup", "readTime", "prefixPath", "documentId" ], ii = [ "canonicalId", "targetId" ], ri = [ "targetId", "path" ], oi = [ "path", "targetId" ], ui = [ "collectionId", "parent" ], ai = [ "indexId", "uid" ], ci = [ "uid", "sequenceNumber" ], hi = [ "indexId", "uid", "arrayValue", "directionalValue", "orderedDocumentKey", "documentKey" ], li = [ "indexId", "uid", "orderedDocumentKey" ], fi = [ "userId", "collectionPath", "documentId" ], di = [ "userId", "collectionPath", "largestBatchId" ], _i = [ "userId", "collectionGroup", "largestBatchId" ], wi = [ ...[ ...[ ...[ ...[ "mutationQueues", "mutations", "documentMutations", "remoteDocuments", "targets", "owner", "targetGlobal", "targetDocuments" ], "clientMetadata" ], "remoteDocumentGlobal" ], "collectionParents" ], "bundles", "namedQueries" ], mi = [ ...wi, "documentOverlays" ], gi = [ "mutationQueues", "mutations", "documentMutations", "remoteDocumentsV14", "targets", "owner", "targetGlobal", "targetDocuments", "clientMetadata", "remoteDocumentGlobal", "collectionParents", "bundles", "namedQueries", "documentOverlays" ], yi = [ ...gi, "indexConfiguration", "indexState", "indexEntries" ];

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const pi = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";

/**
 * A base class representing a persistence transaction, encapsulating both the
 * transaction's sequence numbers as well as a list of onCommitted listeners.
 *
 * When you call Persistence.runTransaction(), it will create a transaction and
 * pass it to your callback. You then pass it to any method that operates
 * on persistence.
 */ class Ii {
    constructor() {
        this.onCommittedListeners = [];
    }
    addOnCommittedListener(t) {
        this.onCommittedListeners.push(t);
    }
    raiseOnCommittedEvent() {
        this.onCommittedListeners.forEach((t => t()));
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * PersistencePromise is essentially a re-implementation of Promise except
 * it has a .next() method instead of .then() and .next() and .catch() callbacks
 * are executed synchronously when a PersistencePromise resolves rather than
 * asynchronously (Promise implementations use setImmediate() or similar).
 *
 * This is necessary to interoperate with IndexedDB which will automatically
 * commit transactions if control is returned to the event loop without
 * synchronously initiating another operation on the transaction.
 *
 * NOTE: .then() and .catch() only allow a single consumer, unlike normal
 * Promises.
 */ class Ti {
    constructor(t) {
        // NOTE: next/catchCallback will always point to our own wrapper functions,
        // not the user's raw next() or catch() callbacks.
        this.nextCallback = null, this.catchCallback = null, 
        // When the operation resolves, we'll set result or error and mark isDone.
        this.result = void 0, this.error = void 0, this.isDone = !1, 
        // Set to true when .then() or .catch() are called and prevents additional
        // chaining.
        this.callbackAttached = !1, t((t => {
            this.isDone = !0, this.result = t, this.nextCallback && 
            // value should be defined unless T is Void, but we can't express
            // that in the type system.
            this.nextCallback(t);
        }), (t => {
            this.isDone = !0, this.error = t, this.catchCallback && this.catchCallback(t);
        }));
    }
    catch(t) {
        return this.next(void 0, t);
    }
    next(t, e) {
        return this.callbackAttached && U(), this.callbackAttached = !0, this.isDone ? this.error ? this.wrapFailure(e, this.error) : this.wrapSuccess(t, this.result) : new Ti(((n, s) => {
            this.nextCallback = e => {
                this.wrapSuccess(t, e).next(n, s);
            }, this.catchCallback = t => {
                this.wrapFailure(e, t).next(n, s);
            };
        }));
    }
    toPromise() {
        return new Promise(((t, e) => {
            this.next(t, e);
        }));
    }
    wrapUserFunction(t) {
        try {
            const e = t();
            return e instanceof Ti ? e : Ti.resolve(e);
        } catch (t) {
            return Ti.reject(t);
        }
    }
    wrapSuccess(t, e) {
        return t ? this.wrapUserFunction((() => t(e))) : Ti.resolve(e);
    }
    wrapFailure(t, e) {
        return t ? this.wrapUserFunction((() => t(e))) : Ti.reject(e);
    }
    static resolve(t) {
        return new Ti(((e, n) => {
            e(t);
        }));
    }
    static reject(t) {
        return new Ti(((e, n) => {
            n(t);
        }));
    }
    static waitFor(
    // Accept all Promise types in waitFor().
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t) {
        return new Ti(((e, n) => {
            let s = 0, i = 0, r = !1;
            t.forEach((t => {
                ++s, t.next((() => {
                    ++i, r && i === s && e();
                }), (t => n(t)));
            })), r = !0, i === s && e();
        }));
    }
    /**
     * Given an array of predicate functions that asynchronously evaluate to a
     * boolean, implements a short-circuiting `or` between the results. Predicates
     * will be evaluated until one of them returns `true`, then stop. The final
     * result will be whether any of them returned `true`.
     */    static or(t) {
        let e = Ti.resolve(!1);
        for (const n of t) e = e.next((t => t ? Ti.resolve(t) : n()));
        return e;
    }
    static forEach(t, e) {
        const n = [];
        return t.forEach(((t, s) => {
            n.push(e.call(this, t, s));
        })), this.waitFor(n);
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// References to `window` are guarded by SimpleDb.isAvailable()
/* eslint-disable no-restricted-globals */
/**
 * Wraps an IDBTransaction and exposes a store() method to get a handle to a
 * specific object store.
 */
class Ei {
    constructor(t, e) {
        this.action = t, this.transaction = e, this.aborted = !1, 
        /**
         * A `Promise` that resolves with the result of the IndexedDb transaction.
         */
        this.At = new W, this.transaction.oncomplete = () => {
            this.At.resolve();
        }, this.transaction.onabort = () => {
            e.error ? this.At.reject(new Pi(t, e.error)) : this.At.resolve();
        }, this.transaction.onerror = e => {
            const n = Di(e.target.error);
            this.At.reject(new Pi(t, n));
        };
    }
    static open(t, e, n, s) {
        try {
            return new Ei(e, t.transaction(s, n));
        } catch (t) {
            throw new Pi(e, t);
        }
    }
    get Rt() {
        return this.At.promise;
    }
    abort(t) {
        t && this.At.reject(t), this.aborted || (F("SimpleDb", "Aborting transaction:", t ? t.message : "Client-initiated abort"), 
        this.aborted = !0, this.transaction.abort());
    }
    Pt() {
        // If the browser supports V3 IndexedDB, we invoke commit() explicitly to
        // speed up index DB processing if the event loop remains blocks.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const t = this.transaction;
        this.aborted || "function" != typeof t.commit || t.commit();
    }
    /**
     * Returns a SimpleDbStore<KeyType, ValueType> for the specified store. All
     * operations performed on the SimpleDbStore happen within the context of this
     * transaction and it cannot be used anymore once the transaction is
     * completed.
     *
     * Note that we can't actually enforce that the KeyType and ValueType are
     * correct, but they allow type safety through the rest of the consuming code.
     */    store(t) {
        const e = this.transaction.objectStore(t);
        return new Vi(e);
    }
}

/**
 * Provides a wrapper around IndexedDb with a simplified interface that uses
 * Promise-like return values to chain operations. Real promises cannot be used
 * since .then() continuations are executed asynchronously (e.g. via
 * .setImmediate), which would cause IndexedDB to end the transaction.
 * See PersistencePromise for more details.
 */ class Ai {
    /*
     * Creates a new SimpleDb wrapper for IndexedDb database `name`.
     *
     * Note that `version` must not be a downgrade. IndexedDB does not support
     * downgrading the schema version. We currently do not support any way to do
     * versioning outside of IndexedDB's versioning mechanism, as only
     * version-upgrade transactions are allowed to do things like create
     * objectstores.
     */
    constructor(t, e, n) {
        this.name = t, this.version = e, this.bt = n;
        // NOTE: According to https://bugs.webkit.org/show_bug.cgi?id=197050, the
        // bug we're checking for should exist in iOS >= 12.2 and < 13, but for
        // whatever reason it's much harder to hit after 12.2 so we only proactively
        // log on 12.2.
        12.2 === Ai.Vt(h()) && $("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.");
    }
    /** Deletes the specified database. */    static delete(t) {
        return F("SimpleDb", "Removing database:", t), vi(window.indexedDB.deleteDatabase(t)).toPromise();
    }
    /** Returns true if IndexedDB is available in the current environment. */    static vt() {
        if (!l()) return !1;
        if (Ai.St()) return !0;
        // We extensively use indexed array values and compound keys,
        // which IE and Edge do not support. However, they still have indexedDB
        // defined on the window, so we need to check for them here and make sure
        // to return that persistence is not enabled for those browsers.
        // For tracking support of this feature, see here:
        // https://developer.microsoft.com/en-us/microsoft-edge/platform/status/indexeddbarraysandmultientrysupport/
        // Check the UA string to find out the browser.
                const t = h(), e = Ai.Vt(t), n = 0 < e && e < 10, s = Ai.Dt(t), i = 0 < s && s < 4.5;
        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        // Edge
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML,
        // like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
        // iOS Safari: Disable for users running iOS version < 10.
                return !(t.indexOf("MSIE ") > 0 || t.indexOf("Trident/") > 0 || t.indexOf("Edge/") > 0 || n || i);
    }
    /**
     * Returns true if the backing IndexedDB store is the Node IndexedDBShim
     * (see https://github.com/axemclion/IndexedDBShim).
     */    static St() {
        var t;
        return "undefined" != typeof process && "YES" === (null === (t = process.env) || void 0 === t ? void 0 : t.Ct);
    }
    /** Helper to get a typed SimpleDbStore from a transaction. */    static xt(t, e) {
        return t.store(e);
    }
    // visible for testing
    /** Parse User Agent to determine iOS version. Returns -1 if not found. */
    static Vt(t) {
        const e = t.match(/i(?:phone|pad|pod) os ([\d_]+)/i), n = e ? e[1].split("_").slice(0, 2).join(".") : "-1";
        return Number(n);
    }
    // visible for testing
    /** Parse User Agent to determine Android version. Returns -1 if not found. */
    static Dt(t) {
        const e = t.match(/Android ([\d.]+)/i), n = e ? e[1].split(".").slice(0, 2).join(".") : "-1";
        return Number(n);
    }
    /**
     * Opens the specified database, creating or upgrading it if necessary.
     */    async Nt(t) {
        return this.db || (F("SimpleDb", "Opening database:", this.name), this.db = await new Promise(((e, n) => {
            // TODO(mikelehen): Investigate browser compatibility.
            // https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
            // suggests IE9 and older WebKit browsers handle upgrade
            // differently. They expect setVersion, as described here:
            // https://developer.mozilla.org/en-US/docs/Web/API/IDBVersionChangeRequest/setVersion
            const s = indexedDB.open(this.name, this.version);
            s.onsuccess = t => {
                const n = t.target.result;
                e(n);
            }, s.onblocked = () => {
                n(new Pi(t, "Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."));
            }, s.onerror = e => {
                const s = e.target.error;
                "VersionError" === s.name ? n(new j(Q.FAILED_PRECONDITION, "A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")) : "InvalidStateError" === s.name ? n(new j(Q.FAILED_PRECONDITION, "Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: " + s)) : n(new Pi(t, s));
            }, s.onupgradeneeded = t => {
                F("SimpleDb", 'Database "' + this.name + '" requires upgrade from version:', t.oldVersion);
                const e = t.target.result;
                this.bt.kt(e, s.transaction, t.oldVersion, this.version).next((() => {
                    F("SimpleDb", "Database upgrade to version " + this.version + " complete");
                }));
            };
        }))), this.Mt && (this.db.onversionchange = t => this.Mt(t)), this.db;
    }
    Ot(t) {
        this.Mt = t, this.db && (this.db.onversionchange = e => t(e));
    }
    async runTransaction(t, e, n, s) {
        const i = "readonly" === e;
        let r = 0;
        for (;;) {
            ++r;
            try {
                this.db = await this.Nt(t);
                const e = Ei.open(this.db, t, i ? "readonly" : "readwrite", n), r = s(e).next((t => (e.Pt(), 
                t))).catch((t => (
                // Abort the transaction if there was an error.
                e.abort(t), Ti.reject(t)))).toPromise();
                // As noted above, errors are propagated by aborting the transaction. So
                // we swallow any error here to avoid the browser logging it as unhandled.
                return r.catch((() => {})), 
                // Wait for the transaction to complete (i.e. IndexedDb's onsuccess event to
                // fire), but still return the original transactionFnResult back to the
                // caller.
                await e.Rt, r;
            } catch (t) {
                // TODO(schmidt-sebastian): We could probably be smarter about this and
                // not retry exceptions that are likely unrecoverable (such as quota
                // exceeded errors).
                // Note: We cannot use an instanceof check for FirestoreException, since the
                // exception is wrapped in a generic error by our async/await handling.
                const e = "FirebaseError" !== t.name && r < 3;
                if (F("SimpleDb", "Transaction failed with error:", t.message, "Retrying:", e), 
                this.close(), !e) return Promise.reject(t);
            }
        }
    }
    close() {
        this.db && this.db.close(), this.db = void 0;
    }
}

/**
 * A controller for iterating over a key range or index. It allows an iterate
 * callback to delete the currently-referenced object, or jump to a new key
 * within the key range or index.
 */ class Ri {
    constructor(t) {
        this.Ft = t, this.$t = !1, this.Bt = null;
    }
    get isDone() {
        return this.$t;
    }
    get Lt() {
        return this.Bt;
    }
    set cursor(t) {
        this.Ft = t;
    }
    /**
     * This function can be called to stop iteration at any point.
     */    done() {
        this.$t = !0;
    }
    /**
     * This function can be called to skip to that next key, which could be
     * an index or a primary key.
     */    Ut(t) {
        this.Bt = t;
    }
    /**
     * Delete the current cursor value from the object store.
     *
     * NOTE: You CANNOT do this with a keysOnly query.
     */    delete() {
        return vi(this.Ft.delete());
    }
}

/** An error that wraps exceptions that thrown during IndexedDB execution. */ class Pi extends j {
    constructor(t, e) {
        super(Q.UNAVAILABLE, `IndexedDB transaction '${t}' failed: ${e}`), this.name = "IndexedDbTransactionError";
    }
}

/** Verifies whether `e` is an IndexedDbTransactionError. */ function bi(t) {
    // Use name equality, as instanceof checks on errors don't work with errors
    // that wrap other errors.
    return "IndexedDbTransactionError" === t.name;
}

/**
 * A wrapper around an IDBObjectStore providing an API that:
 *
 * 1) Has generic KeyType / ValueType parameters to provide strongly-typed
 * methods for acting against the object store.
 * 2) Deals with IndexedDB's onsuccess / onerror event callbacks, making every
 * method return a PersistencePromise instead.
 * 3) Provides a higher-level API to avoid needing to do excessive wrapping of
 * intermediate IndexedDB types (IDBCursorWithValue, etc.)
 */ class Vi {
    constructor(t) {
        this.store = t;
    }
    put(t, e) {
        let n;
        return void 0 !== e ? (F("SimpleDb", "PUT", this.store.name, t, e), n = this.store.put(e, t)) : (F("SimpleDb", "PUT", this.store.name, "<auto-key>", t), 
        n = this.store.put(t)), vi(n);
    }
    /**
     * Adds a new value into an Object Store and returns the new key. Similar to
     * IndexedDb's `add()`, this method will fail on primary key collisions.
     *
     * @param value - The object to write.
     * @returns The key of the value to add.
     */    add(t) {
        F("SimpleDb", "ADD", this.store.name, t, t);
        return vi(this.store.add(t));
    }
    /**
     * Gets the object with the specified key from the specified store, or null
     * if no object exists with the specified key.
     *
     * @key The key of the object to get.
     * @returns The object with the specified key or null if no object exists.
     */    get(t) {
        // We're doing an unsafe cast to ValueType.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return vi(this.store.get(t)).next((e => (
        // Normalize nonexistence to null.
        void 0 === e && (e = null), F("SimpleDb", "GET", this.store.name, t, e), e)));
    }
    delete(t) {
        F("SimpleDb", "DELETE", this.store.name, t);
        return vi(this.store.delete(t));
    }
    /**
     * If we ever need more of the count variants, we can add overloads. For now,
     * all we need is to count everything in a store.
     *
     * Returns the number of rows in the store.
     */    count() {
        F("SimpleDb", "COUNT", this.store.name);
        return vi(this.store.count());
    }
    qt(t, e) {
        const n = this.options(t, e);
        // Use `getAll()` if the browser supports IndexedDB v3, as it is roughly
        // 20% faster. Unfortunately, getAll() does not support custom indices.
                if (n.index || "function" != typeof this.store.getAll) {
            const t = this.cursor(n), e = [];
            return this.Kt(t, ((t, n) => {
                e.push(n);
            })).next((() => e));
        }
        {
            const t = this.store.getAll(n.range);
            return new Ti(((e, n) => {
                t.onerror = t => {
                    n(t.target.error);
                }, t.onsuccess = t => {
                    e(t.target.result);
                };
            }));
        }
    }
    /**
     * Loads the first `count` elements from the provided index range. Loads all
     * elements if no limit is provided.
     */    Gt(t, e) {
        const n = this.store.getAll(t, null === e ? void 0 : e);
        return new Ti(((t, e) => {
            n.onerror = t => {
                e(t.target.error);
            }, n.onsuccess = e => {
                t(e.target.result);
            };
        }));
    }
    Qt(t, e) {
        F("SimpleDb", "DELETE ALL", this.store.name);
        const n = this.options(t, e);
        n.jt = !1;
        const s = this.cursor(n);
        return this.Kt(s, ((t, e, n) => n.delete()));
    }
    Wt(t, e) {
        let n;
        e ? n = t : (n = {}, e = t);
        const s = this.cursor(n);
        return this.Kt(s, e);
    }
    /**
     * Iterates over a store, but waits for the given callback to complete for
     * each entry before iterating the next entry. This allows the callback to do
     * asynchronous work to determine if this iteration should continue.
     *
     * The provided callback should return `true` to continue iteration, and
     * `false` otherwise.
     */    zt(t) {
        const e = this.cursor({});
        return new Ti(((n, s) => {
            e.onerror = t => {
                const e = Di(t.target.error);
                s(e);
            }, e.onsuccess = e => {
                const s = e.target.result;
                s ? t(s.primaryKey, s.value).next((t => {
                    t ? s.continue() : n();
                })) : n();
            };
        }));
    }
    Kt(t, e) {
        const n = [];
        return new Ti(((s, i) => {
            t.onerror = t => {
                i(t.target.error);
            }, t.onsuccess = t => {
                const i = t.target.result;
                if (!i) return void s();
                const r = new Ri(i), o = e(i.primaryKey, i.value, r);
                if (o instanceof Ti) {
                    const t = o.catch((t => (r.done(), Ti.reject(t))));
                    n.push(t);
                }
                r.isDone ? s() : null === r.Lt ? i.continue() : i.continue(r.Lt);
            };
        })).next((() => Ti.waitFor(n)));
    }
    options(t, e) {
        let n;
        return void 0 !== t && ("string" == typeof t ? n = t : e = t), {
            index: n,
            range: e
        };
    }
    cursor(t) {
        let e = "next";
        if (t.reverse && (e = "prev"), t.index) {
            const n = this.store.index(t.index);
            return t.jt ? n.openKeyCursor(t.range, e) : n.openCursor(t.range, e);
        }
        return this.store.openCursor(t.range, e);
    }
}

/**
 * Wraps an IDBRequest in a PersistencePromise, using the onsuccess / onerror
 * handlers to resolve / reject the PersistencePromise as appropriate.
 */ function vi(t) {
    return new Ti(((e, n) => {
        t.onsuccess = t => {
            const n = t.target.result;
            e(n);
        }, t.onerror = t => {
            const e = Di(t.target.error);
            n(e);
        };
    }));
}

// Guard so we only report the error once.
let Si = !1;

function Di(t) {
    const e = Ai.Vt(h());
    if (e >= 12.2 && e < 13) {
        const e = "An internal error was encountered in the Indexed Database server";
        if (t.message.indexOf(e) >= 0) {
            // Wrap error in a more descriptive one.
            const t = new j("internal", `IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);
            return Si || (Si = !0, 
            // Throw a global exception outside of this promise chain, for the user to
            // potentially catch.
            setTimeout((() => {
                throw t;
            }), 0)), t;
        }
    }
    return t;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ci extends Ii {
    constructor(t, e) {
        super(), this.Ht = t, this.currentSequenceNumber = e;
    }
}

function xi(t, e) {
    const n = G(t);
    return Ai.xt(n.Ht, e);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A batch of mutations that will be sent as one unit to the backend.
 */ class Ni {
    /**
     * @param batchId - The unique ID of this mutation batch.
     * @param localWriteTime - The original write time of this mutation.
     * @param baseMutations - Mutations that are used to populate the base
     * values when this mutation is applied locally. This can be used to locally
     * overwrite values that are persisted in the remote document cache. Base
     * mutations are never sent to the backend.
     * @param mutations - The user-provided mutations in this mutation batch.
     * User-provided mutations are applied both locally and remotely on the
     * backend.
     */
    constructor(t, e, n, s) {
        this.batchId = t, this.localWriteTime = e, this.baseMutations = n, this.mutations = s;
    }
    /**
     * Applies all the mutations in this MutationBatch to the specified document
     * to compute the state of the remote document
     *
     * @param document - The document to apply mutations to.
     * @param batchResult - The result of applying the MutationBatch to the
     * backend.
     */    applyToRemoteDocument(t, e) {
        const n = e.mutationResults;
        for (let e = 0; e < this.mutations.length; e++) {
            const s = this.mutations[e];
            if (s.key.isEqual(t.key)) {
                An(s, t, n[e]);
            }
        }
    }
    /**
     * Computes the local view of a document given all the mutations in this
     * batch.
     *
     * @param document - The document to apply mutations to.
     */    applyToLocalView(t) {
        // First, apply the base state. This allows us to apply non-idempotent
        // transform against a consistent set of values.
        for (const e of this.baseMutations) e.key.isEqual(t.key) && Rn(e, t, this.localWriteTime);
        // Second, apply all user-provided mutations.
                for (const e of this.mutations) e.key.isEqual(t.key) && Rn(e, t, this.localWriteTime);
    }
    /**
     * Computes the local view for all provided documents given the mutations in
     * this batch.
     */    applyToLocalDocumentSet(t) {
        // TODO(mrschmidt): This implementation is O(n^2). If we apply the mutations
        // directly (as done in `applyToLocalView()`), we can reduce the complexity
        // to O(n).
        this.mutations.forEach((e => {
            const n = t.get(e.key), s = n;
            // TODO(mutabledocuments): This method should take a MutableDocumentMap
            // and we should remove this cast.
                        this.applyToLocalView(s), n.isValidDocument() || s.convertToNoDocument(ht.min());
        }));
    }
    keys() {
        return this.mutations.reduce(((t, e) => t.add(e.key)), ts());
    }
    isEqual(t) {
        return this.batchId === t.batchId && ut(this.mutations, t.mutations, ((t, e) => bn(t, e))) && ut(this.baseMutations, t.baseMutations, ((t, e) => bn(t, e)));
    }
}

/** The result of applying a mutation batch to the backend. */ class ki {
    constructor(t, e, n, 
    /**
     * A pre-computed mapping from each mutated document to the resulting
     * version.
     */
    s) {
        this.batch = t, this.commitVersion = e, this.mutationResults = n, this.docVersions = s;
    }
    /**
     * Creates a new MutationBatchResult for the given batch and results. There
     * must be one result for each mutation in the batch. This static factory
     * caches a document=&gt;version mapping (docVersions).
     */    static from(t, e, n) {
        q(t.mutations.length === n.length);
        let s = Xn;
        const i = t.mutations;
        for (let t = 0; t < i.length; t++) s = s.insert(i[t].key, n[t].version);
        return new ki(t, e, n, s);
    }
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Representation of an overlay computed by Firestore.
 *
 * Holds information about a mutation and the largest batch id in Firestore when
 * the mutation was created.
 */ class Mi {
    constructor(t, e) {
        this.largestBatchId = t, this.mutation = e;
    }
    getKey() {
        return this.mutation.key;
    }
    isEqual(t) {
        return null !== t && this.mutation === t.mutation;
    }
    toString() {
        return `Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An immutable set of metadata that the local store tracks for each target.
 */ class Oi {
    constructor(
    /** The target being listened to. */
    t, 
    /**
     * The target ID to which the target corresponds; Assigned by the
     * LocalStore for user listens and by the SyncEngine for limbo watches.
     */
    e, 
    /** The purpose of the target. */
    n, 
    /**
     * The sequence number of the last transaction during which this target data
     * was modified.
     */
    s, 
    /** The latest snapshot version seen for this target. */
    i = ht.min()
    /**
     * The maximum snapshot version at which the associated view
     * contained no limbo documents.
     */ , r = ht.min()
    /**
     * An opaque, server-assigned token that allows watching a target to be
     * resumed after disconnecting without retransmitting all the data that
     * matches the target. The resume token essentially identifies a point in
     * time from which the server should resume sending results.
     */ , o = Tt.EMPTY_BYTE_STRING) {
        this.target = t, this.targetId = e, this.purpose = n, this.sequenceNumber = s, this.snapshotVersion = i, 
        this.lastLimboFreeSnapshotVersion = r, this.resumeToken = o;
    }
    /** Creates a new target data instance with an updated sequence number. */    withSequenceNumber(t) {
        return new Oi(this.target, this.targetId, this.purpose, t, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken);
    }
    /**
     * Creates a new target data instance with an updated resume token and
     * snapshot version.
     */    withResumeToken(t, e) {
        return new Oi(this.target, this.targetId, this.purpose, this.sequenceNumber, e, this.lastLimboFreeSnapshotVersion, t);
    }
    /**
     * Creates a new target data instance with an updated last limbo free
     * snapshot version number.
     */    withLastLimboFreeSnapshotVersion(t) {
        return new Oi(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, t, this.resumeToken);
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Serializer for values stored in the LocalStore. */ class Fi {
    constructor(t) {
        this.Jt = t;
    }
}

/** Decodes a remote document from storage locally to a Document. */ function $i(t, e) {
    let n;
    if (e.document) n = vs(t.Jt, e.document, !!e.hasCommittedMutations); else if (e.noDocument) {
        const t = kt.fromSegments(e.noDocument.path), s = qi(e.noDocument.readTime);
        n = ie.newNoDocument(t, s), e.hasCommittedMutations && n.setHasCommittedMutations();
    } else {
        if (!e.unknownDocument) return U();
        {
            const t = kt.fromSegments(e.unknownDocument.path), s = qi(e.unknownDocument.version);
            n = ie.newUnknownDocument(t, s);
        }
    }
    return e.readTime && n.setReadTime(function(t) {
        const e = new ct(t[0], t[1]);
        return ht.fromTimestamp(e);
    }(e.readTime)), n;
}

/** Encodes a document for storage locally. */ function Bi(t, e) {
    const n = e.key, s = {
        prefixPath: n.getCollectionPath().popLast().toArray(),
        collectionGroup: n.collectionGroup,
        documentId: n.path.lastSegment(),
        readTime: Li(e.readTime),
        hasCommittedMutations: e.hasCommittedMutations
    };
    if (e.isFoundDocument()) s.document = function(t, e) {
        return {
            name: Ts(t, e.key),
            fields: e.data.value.mapValue.fields,
            updateTime: ws(t, e.version.toTimestamp())
        };
    }(t.Jt, e); else if (e.isNoDocument()) s.noDocument = {
        path: n.path.toArray(),
        readTime: Ui(e.version)
    }; else {
        if (!e.isUnknownDocument()) return U();
        s.unknownDocument = {
            path: n.path.toArray(),
            version: Ui(e.version)
        };
    }
    return s;
}

function Li(t) {
    const e = t.toTimestamp();
    return [ e.seconds, e.nanoseconds ];
}

function Ui(t) {
    const e = t.toTimestamp();
    return {
        seconds: e.seconds,
        nanoseconds: e.nanoseconds
    };
}

function qi(t) {
    const e = new ct(t.seconds, t.nanoseconds);
    return ht.fromTimestamp(e);
}

/** Encodes a batch of mutations into a DbMutationBatch for local storage. */
/** Decodes a DbMutationBatch into a MutationBatch */
function Ki(t, e) {
    const n = (e.baseMutations || []).map((e => xs(t.Jt, e)));
    // Squash old transform mutations into existing patch or set mutations.
    // The replacement of representing `transforms` with `update_transforms`
    // on the SDK means that old `transform` mutations stored in IndexedDB need
    // to be updated to `update_transforms`.
    // TODO(b/174608374): Remove this code once we perform a schema migration.
        for (let t = 0; t < e.mutations.length - 1; ++t) {
        const n = e.mutations[t];
        if (t + 1 < e.mutations.length && void 0 !== e.mutations[t + 1].transform) {
            const s = e.mutations[t + 1];
            n.updateTransforms = s.transform.fieldTransforms, e.mutations.splice(t + 1, 1), 
            ++t;
        }
    }
    const s = e.mutations.map((e => xs(t.Jt, e))), i = ct.fromMillis(e.localWriteTimeMs);
    return new Ni(e.batchId, i, n, s);
}

/** Decodes a DbTarget into TargetData */ function Gi(t) {
    const e = qi(t.readTime), n = void 0 !== t.lastLimboFreeSnapshotVersion ? qi(t.lastLimboFreeSnapshotVersion) : ht.min();
    let s;
    var i;
    return void 0 !== t.query.documents ? (q(1 === (i = t.query).documents.length), 
    s = je(Be(Rs(i.documents[0])))) : s = function(t) {
        return je(Os(t));
    }(t.query), new Oi(s, t.targetId, 0 /* Listen */ , t.lastListenSequenceNumber, e, n, Tt.fromBase64String(t.resumeToken));
}

/** Encodes TargetData into a DbTarget for storage locally. */ function Qi(t, e) {
    const n = Ui(e.snapshotVersion), s = Ui(e.lastLimboFreeSnapshotVersion);
    let i;
    i = pe(e.target) ? ks(t.Jt, e.target) : Ms(t.Jt, e.target);
    // We can't store the resumeToken as a ByteString in IndexedDb, so we
    // convert it to a base64 string for storage.
        const r = e.resumeToken.toBase64();
    // lastListenSequenceNumber is always 0 until we do real GC.
        return {
        targetId: e.targetId,
        canonicalId: me(e.target),
        readTime: n,
        resumeToken: r,
        lastListenSequenceNumber: e.sequenceNumber,
        lastLimboFreeSnapshotVersion: s,
        query: i
    };
}

/**
 * A helper function for figuring out what kind of query has been stored.
 */
/**
 * Encodes a `BundledQuery` from bundle proto to a Query object.
 *
 * This reconstructs the original query used to build the bundle being loaded,
 * including features exists only in SDKs (for example: limit-to-last).
 */
function ji(t) {
    const e = Os({
        parent: t.parent,
        structuredQuery: t.structuredQuery
    });
    return "LAST" === t.limitType ? We(e, e.limit, "L" /* Last */) : e;
}

/** Encodes a NamedQuery proto object to a NamedQuery model object. */
/** Encodes a DbDocumentOverlay object to an Overlay model object. */
function Wi(t, e) {
    return new Mi(e.largestBatchId, xs(t.Jt, e.overlayMutation));
}

/** Decodes an Overlay model object into a DbDocumentOverlay object. */
/**
 * Returns the DbDocumentOverlayKey corresponding to the given user and
 * document key.
 */
function zi(t, e) {
    const n = e.path.lastSegment();
    return [ t, Ws(e.path.popLast()), n ];
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Hi {
    getBundleMetadata(t, e) {
        return Ji(t).get(e).next((t => {
            if (t) return {
                id: (e = t).bundleId,
                createTime: qi(e.createTime),
                version: e.version
            };
            /** Encodes a DbBundle to a BundleMetadata object. */
            var e;
            /** Encodes a BundleMetadata to a DbBundle. */        }));
    }
    saveBundleMetadata(t, e) {
        return Ji(t).put({
            bundleId: (n = e).id,
            createTime: Ui(ys(n.createTime)),
            version: n.version
        });
        var n;
        /** Encodes a DbNamedQuery to a NamedQuery. */    }
    getNamedQuery(t, e) {
        return Yi(t).get(e).next((t => {
            if (t) return {
                name: (e = t).name,
                query: ji(e.bundledQuery),
                readTime: qi(e.readTime)
            };
            var e;
            /** Encodes a NamedQuery from a bundle proto to a DbNamedQuery. */        }));
    }
    saveNamedQuery(t, e) {
        return Yi(t).put(function(t) {
            return {
                name: t.name,
                readTime: Ui(ys(t.readTime)),
                bundledQuery: t.bundledQuery
            };
        }(e));
    }
}

/**
 * Helper to get a typed SimpleDbStore for the bundles object store.
 */ function Ji(t) {
    return xi(t, "bundles");
}

/**
 * Helper to get a typed SimpleDbStore for the namedQueries object store.
 */ function Yi(t) {
    return xi(t, "namedQueries");
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Implementation of DocumentOverlayCache using IndexedDb.
 */ class Xi {
    /**
     * @param serializer - The document serializer.
     * @param userId - The userId for which we are accessing overlays.
     */
    constructor(t, e) {
        this.M = t, this.userId = e;
    }
    static Yt(t, e) {
        const n = e.uid || "";
        return new Xi(t, n);
    }
    getOverlay(t, e) {
        return Zi(t).get(zi(this.userId, e)).next((t => t ? Wi(this.M, t) : null));
    }
    saveOverlays(t, e, n) {
        const s = [];
        return n.forEach(((n, i) => {
            const r = new Mi(e, i);
            s.push(this.Xt(t, r));
        })), Ti.waitFor(s);
    }
    removeOverlaysForBatchId(t, e, n) {
        const s = new Set;
        // Get the set of unique collection paths.
                e.forEach((t => s.add(Ws(t.getCollectionPath()))));
        const i = [];
        return s.forEach((e => {
            const s = IDBKeyRange.bound([ this.userId, e, n ], [ this.userId, e, n + 1 ], 
            /*lowerOpen=*/ !1, 
            /*upperOpen=*/ !0);
            i.push(Zi(t).Qt("collectionPathOverlayIndex", s));
        })), Ti.waitFor(i);
    }
    getOverlaysForCollection(t, e, n) {
        const s = Yn(), i = Ws(e), r = IDBKeyRange.bound([ this.userId, i, n ], [ this.userId, i, Number.POSITIVE_INFINITY ], 
        /*lowerOpen=*/ !0);
        return Zi(t).qt("collectionPathOverlayIndex", r).next((t => {
            for (const e of t) {
                const t = Wi(this.M, e);
                s.set(t.getKey(), t);
            }
            return s;
        }));
    }
    getOverlaysForCollectionGroup(t, e, n, s) {
        const i = Yn();
        let r;
        // We want batch IDs larger than `sinceBatchId`, and so the lower bound
        // is not inclusive.
                const o = IDBKeyRange.bound([ this.userId, e, n ], [ this.userId, e, Number.POSITIVE_INFINITY ], 
        /*lowerOpen=*/ !0);
        return Zi(t).Wt({
            index: "collectionGroupOverlayIndex",
            range: o
        }, ((t, e, n) => {
            // We do not want to return partial batch overlays, even if the size
            // of the result set exceeds the given `count` argument. Therefore, we
            // continue to aggregate results even after the result size exceeds
            // `count` if there are more overlays from the `currentBatchId`.
            const o = Wi(this.M, e);
            i.size() < s || o.largestBatchId === r ? (i.set(o.getKey(), o), r = o.largestBatchId) : n.done();
        })).next((() => i));
    }
    Xt(t, e) {
        return Zi(t).put(function(t, e, n) {
            const [s, i, r] = zi(e, n.mutation.key);
            return {
                userId: e,
                collectionPath: i,
                documentId: r,
                collectionGroup: n.mutation.key.getCollectionGroup(),
                largestBatchId: n.largestBatchId,
                overlayMutation: Cs(t.Jt, n.mutation)
            };
        }(this.M, this.userId, e));
    }
}

/**
 * Helper to get a typed SimpleDbStore for the document overlay object store.
 */ function Zi(t) {
    return xi(t, "documentOverlays");
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Note: This code is copied from the backend. Code that is not used by
// Firestore was removed.
/** Firestore index value writer.  */
class tr {
    constructor() {}
    // The write methods below short-circuit writing terminators for values
    // containing a (terminating) truncated value.
    // As an example, consider the resulting encoding for:
    // ["bar", [2, "foo"]] -> (STRING, "bar", TERM, ARRAY, NUMBER, 2, STRING, "foo", TERM, TERM, TERM)
    // ["bar", [2, truncated("foo")]] -> (STRING, "bar", TERM, ARRAY, NUMBER, 2, STRING, "foo", TRUNC)
    // ["bar", truncated(["foo"])] -> (STRING, "bar", TERM, ARRAY. STRING, "foo", TERM, TRUNC)
    /** Writes an index value.  */
    Zt(t, e) {
        this.te(t, e), 
        // Write separator to split index values
        // (see go/firestore-storage-format#encodings).
        e.ee();
    }
    te(t, e) {
        if ("nullValue" in t) this.ne(e, 5); else if ("booleanValue" in t) this.ne(e, 10), 
        e.se(t.booleanValue ? 1 : 0); else if ("integerValue" in t) this.ne(e, 15), e.se(Rt(t.integerValue)); else if ("doubleValue" in t) {
            const n = Rt(t.doubleValue);
            isNaN(n) ? this.ne(e, 13) : (this.ne(e, 15), xt(n) ? 
            // -0.0, 0 and 0.0 are all considered the same
            e.se(0) : e.se(n));
        } else if ("timestampValue" in t) {
            const n = t.timestampValue;
            this.ne(e, 20), "string" == typeof n ? e.ie(n) : (e.ie(`${n.seconds || ""}`), e.se(n.nanos || 0));
        } else if ("stringValue" in t) this.re(t.stringValue, e), this.oe(e); else if ("bytesValue" in t) this.ne(e, 30), 
        e.ue(Pt(t.bytesValue)), this.oe(e); else if ("referenceValue" in t) this.ae(t.referenceValue, e); else if ("geoPointValue" in t) {
            const n = t.geoPointValue;
            this.ne(e, 45), e.se(n.latitude || 0), e.se(n.longitude || 0);
        } else "mapValue" in t ? Yt(t) ? this.ne(e, Number.MAX_SAFE_INTEGER) : (this.ce(t.mapValue, e), 
        this.oe(e)) : "arrayValue" in t ? (this.he(t.arrayValue, e), this.oe(e)) : U();
    }
    re(t, e) {
        this.ne(e, 25), this.le(t, e);
    }
    le(t, e) {
        e.ie(t);
    }
    ce(t, e) {
        const n = t.fields || {};
        this.ne(e, 55);
        for (const t of Object.keys(n)) this.re(t, e), this.te(n[t], e);
    }
    he(t, e) {
        const n = t.values || [];
        this.ne(e, 50);
        for (const t of n) this.te(t, e);
    }
    ae(t, e) {
        this.ne(e, 37);
        kt.fromName(t).path.forEach((t => {
            this.ne(e, 60), this.le(t, e);
        }));
    }
    ne(t, e) {
        t.se(e);
    }
    oe(t) {
        // While the SDK does not implement truncation, the truncation marker is
        // used to terminate all variable length values (which are strings, bytes,
        // references, arrays and maps).
        t.se(2);
    }
}

tr.fe = new tr;

/**
 * Counts the number of zeros in a byte.
 *
 * Visible for testing.
 */
function er(t) {
    if (0 === t) return 8;
    let e = 0;
    return t >> 4 == 0 && (
    // Test if the first four bits are zero.
    e += 4, t <<= 4), t >> 6 == 0 && (
    // Test if the first two (or next two) bits are zero.
    e += 2, t <<= 2), t >> 7 == 0 && (
    // Test if the remaining bit is zero.
    e += 1), e;
}

/** Counts the number of leading zeros in the given byte array. */
/**
 * Returns the number of bytes required to store "value". Leading zero bytes
 * are skipped.
 */
function nr(t) {
    // This is just the number of bytes for the unsigned representation of the number.
    const e = 64 - function(t) {
        let e = 0;
        for (let n = 0; n < 8; ++n) {
            const s = er(255 & t[n]);
            if (e += s, 8 !== s) break;
        }
        return e;
    }(t);
    return Math.ceil(e / 8);
}

/**
 * OrderedCodeWriter is a minimal-allocation implementation of the writing
 * behavior defined by the backend.
 *
 * The code is ported from its Java counterpart.
 */ class sr {
    constructor() {
        this.buffer = new Uint8Array(1024), this.position = 0;
    }
    de(t) {
        const e = t[Symbol.iterator]();
        let n = e.next();
        for (;!n.done; ) this._e(n.value), n = e.next();
        this.we();
    }
    me(t) {
        const e = t[Symbol.iterator]();
        let n = e.next();
        for (;!n.done; ) this.ge(n.value), n = e.next();
        this.ye();
    }
    /** Writes utf8 bytes into this byte sequence, ascending. */    pe(t) {
        for (const e of t) {
            const t = e.charCodeAt(0);
            if (t < 128) this._e(t); else if (t < 2048) this._e(960 | t >>> 6), this._e(128 | 63 & t); else if (e < "\ud800" || "\udbff" < e) this._e(480 | t >>> 12), 
            this._e(128 | 63 & t >>> 6), this._e(128 | 63 & t); else {
                const t = e.codePointAt(0);
                this._e(240 | t >>> 18), this._e(128 | 63 & t >>> 12), this._e(128 | 63 & t >>> 6), 
                this._e(128 | 63 & t);
            }
        }
        this.we();
    }
    /** Writes utf8 bytes into this byte sequence, descending */    Ie(t) {
        for (const e of t) {
            const t = e.charCodeAt(0);
            if (t < 128) this.ge(t); else if (t < 2048) this.ge(960 | t >>> 6), this.ge(128 | 63 & t); else if (e < "\ud800" || "\udbff" < e) this.ge(480 | t >>> 12), 
            this.ge(128 | 63 & t >>> 6), this.ge(128 | 63 & t); else {
                const t = e.codePointAt(0);
                this.ge(240 | t >>> 18), this.ge(128 | 63 & t >>> 12), this.ge(128 | 63 & t >>> 6), 
                this.ge(128 | 63 & t);
            }
        }
        this.ye();
    }
    Te(t) {
        // Values are encoded with a single byte length prefix, followed by the
        // actual value in big-endian format with leading 0 bytes dropped.
        const e = this.Ee(t), n = nr(e);
        this.Ae(1 + n), this.buffer[this.position++] = 255 & n;
        // Write the length
        for (let t = e.length - n; t < e.length; ++t) this.buffer[this.position++] = 255 & e[t];
    }
    Re(t) {
        // Values are encoded with a single byte length prefix, followed by the
        // inverted value in big-endian format with leading 0 bytes dropped.
        const e = this.Ee(t), n = nr(e);
        this.Ae(1 + n), this.buffer[this.position++] = ~(255 & n);
        // Write the length
        for (let t = e.length - n; t < e.length; ++t) this.buffer[this.position++] = ~(255 & e[t]);
    }
    /**
     * Writes the "infinity" byte sequence that sorts after all other byte
     * sequences written in ascending order.
     */    Pe() {
        this.be(255), this.be(255);
    }
    /**
     * Writes the "infinity" byte sequence that sorts before all other byte
     * sequences written in descending order.
     */    Ve() {
        this.ve(255), this.ve(255);
    }
    /**
     * Resets the buffer such that it is the same as when it was newly
     * constructed.
     */    reset() {
        this.position = 0;
    }
    seed(t) {
        this.Ae(t.length), this.buffer.set(t, this.position), this.position += t.length;
    }
    /** Makes a copy of the encoded bytes in this buffer.  */    Se() {
        return this.buffer.slice(0, this.position);
    }
    /**
     * Encodes `val` into an encoding so that the order matches the IEEE 754
     * floating-point comparison results with the following exceptions:
     *   -0.0 < 0.0
     *   all non-NaN < NaN
     *   NaN = NaN
     */    Ee(t) {
        const e = 
        /** Converts a JavaScript number to a byte array (using big endian encoding). */
        function(t) {
            const e = new DataView(new ArrayBuffer(8));
            return e.setFloat64(0, t, /* littleEndian= */ !1), new Uint8Array(e.buffer);
        }(t), n = 0 != (128 & e[0]);
        // Check if the first bit is set. We use a bit mask since value[0] is
        // encoded as a number from 0 to 255.
                // Revert the two complement to get natural ordering
        e[0] ^= n ? 255 : 128;
        for (let t = 1; t < e.length; ++t) e[t] ^= n ? 255 : 0;
        return e;
    }
    /** Writes a single byte ascending to the buffer. */    _e(t) {
        const e = 255 & t;
        0 === e ? (this.be(0), this.be(255)) : 255 === e ? (this.be(255), this.be(0)) : this.be(e);
    }
    /** Writes a single byte descending to the buffer.  */    ge(t) {
        const e = 255 & t;
        0 === e ? (this.ve(0), this.ve(255)) : 255 === e ? (this.ve(255), this.ve(0)) : this.ve(t);
    }
    we() {
        this.be(0), this.be(1);
    }
    ye() {
        this.ve(0), this.ve(1);
    }
    be(t) {
        this.Ae(1), this.buffer[this.position++] = t;
    }
    ve(t) {
        this.Ae(1), this.buffer[this.position++] = ~t;
    }
    Ae(t) {
        const e = t + this.position;
        if (e <= this.buffer.length) return;
        // Try doubling.
                let n = 2 * this.buffer.length;
        // Still not big enough? Just allocate the right size.
                n < e && (n = e);
        // Create the new buffer.
                const s = new Uint8Array(n);
        s.set(this.buffer), // copy old data
        this.buffer = s;
    }
}

class ir {
    constructor(t) {
        this.De = t;
    }
    ue(t) {
        this.De.de(t);
    }
    ie(t) {
        this.De.pe(t);
    }
    se(t) {
        this.De.Te(t);
    }
    ee() {
        this.De.Pe();
    }
}

class rr {
    constructor(t) {
        this.De = t;
    }
    ue(t) {
        this.De.me(t);
    }
    ie(t) {
        this.De.Ie(t);
    }
    se(t) {
        this.De.Re(t);
    }
    ee() {
        this.De.Ve();
    }
}

/**
 * Implements `DirectionalIndexByteEncoder` using `OrderedCodeWriter` for the
 * actual encoding.
 */ class or {
    constructor() {
        this.De = new sr, this.Ce = new ir(this.De), this.xe = new rr(this.De);
    }
    seed(t) {
        this.De.seed(t);
    }
    Ne(t) {
        return 0 /* ASCENDING */ === t ? this.Ce : this.xe;
    }
    Se() {
        return this.De.Se();
    }
    reset() {
        this.De.reset();
    }
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Represents an index entry saved by the SDK in persisted storage. */ class ur {
    constructor(t, e, n, s) {
        this.indexId = t, this.documentKey = e, this.arrayValue = n, this.directionalValue = s;
    }
    /**
     * Returns an IndexEntry entry that sorts immediately after the current
     * directional value.
     */    ke() {
        const t = this.directionalValue.length, e = 0 === t || 255 === this.directionalValue[t - 1] ? t + 1 : t, n = new Uint8Array(e);
        return n.set(this.directionalValue, 0), e !== t ? n.set([ 0 ], this.directionalValue.length) : ++n[n.length - 1], 
        new ur(this.indexId, this.documentKey, this.arrayValue, n);
    }
}

function ar(t, e) {
    let n = t.indexId - e.indexId;
    return 0 !== n ? n : (n = cr(t.arrayValue, e.arrayValue), 0 !== n ? n : (n = cr(t.directionalValue, e.directionalValue), 
    0 !== n ? n : kt.comparator(t.documentKey, e.documentKey)));
}

function cr(t, e) {
    for (let n = 0; n < t.length && n < e.length; ++n) {
        const s = t[n] - e[n];
        if (0 !== s) return s;
    }
    return t.length - e.length;
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A light query planner for Firestore.
 *
 * This class matches a `FieldIndex` against a Firestore Query `Target`. It
 * determines whether a given index can be used to serve the specified target.
 *
 * The following table showcases some possible index configurations:
 *
 * Query                                               | Index
 * -----------------------------------------------------------------------------
 * where('a', '==', 'a').where('b', '==', 'b')         | a ASC, b DESC
 * where('a', '==', 'a').where('b', '==', 'b')         | a ASC
 * where('a', '==', 'a').where('b', '==', 'b')         | b DESC
 * where('a', '>=', 'a').orderBy('a')                  | a ASC
 * where('a', '>=', 'a').orderBy('a', 'desc')          | a DESC
 * where('a', '>=', 'a').orderBy('a').orderBy('b')     | a ASC, b ASC
 * where('a', '>=', 'a').orderBy('a').orderBy('b')     | a ASC
 * where('a', 'array-contains', 'a').orderBy('b')      | a CONTAINS, b ASCENDING
 * where('a', 'array-contains', 'a').orderBy('b')      | a CONTAINS
 */ class hr {
    constructor(t) {
        this.collectionId = null != t.collectionGroup ? t.collectionGroup : t.path.lastSegment(), 
        this.Me = t.orderBy, this.Oe = [];
        for (const e of t.filters) {
            const t = e;
            t.S() ? this.Fe = t : this.Oe.push(t);
        }
    }
    /**
     * Returns whether the index can be used to serve the TargetIndexMatcher's
     * target.
     *
     * An index is considered capable of serving the target when:
     * - The target uses all index segments for its filters and orderBy clauses.
     *   The target can have additional filter and orderBy clauses, but not
     *   fewer.
     * - If an ArrayContains/ArrayContainsAnyfilter is used, the index must also
     *   have a corresponding `CONTAINS` segment.
     * - All directional index segments can be mapped to the target as a series of
     *   equality filters, a single inequality filter and a series of orderBy
     *   clauses.
     * - The segments that represent the equality filters may appear out of order.
     * - The optional segment for the inequality filter must appear after all
     *   equality segments.
     * - The segments that represent that orderBy clause of the target must appear
     *   in order after all equality and inequality segments. Single orderBy
     *   clauses cannot be skipped, but a continuous orderBy suffix may be
     *   omitted.
     */    $e(t) {
        // If there is an array element, find a matching filter.
        const e = oe(t);
        if (void 0 !== e && !this.Be(e)) return !1;
        const n = ue(t);
        let s = 0, i = 0;
        // Process all equalities first. Equalities can appear out of order.
        for (;s < n.length && this.Be(n[s]); ++s) ;
        // If we already have processed all segments, all segments are used to serve
        // the equality filters and we do not need to map any segments to the
        // target's inequality and orderBy clauses.
                if (s === n.length) return !0;
        // If there is an inequality filter, the next segment must match both the
        // filter and the first orderBy clause.
                if (void 0 !== this.Fe) {
            const t = n[s];
            if (!this.Le(this.Fe, t) || !this.Ue(this.Me[i++], t)) return !1;
            ++s;
        }
        // All remaining segments need to represent the prefix of the target's
        // orderBy.
                for (;s < n.length; ++s) {
            const t = n[s];
            if (i >= this.Me.length || !this.Ue(this.Me[i++], t)) return !1;
        }
        return !0;
    }
    Be(t) {
        for (const e of this.Oe) if (this.Le(e, t)) return !0;
        return !1;
    }
    Le(t, e) {
        if (void 0 === t || !t.field.isEqual(e.fieldPath)) return !1;
        const n = "array-contains" /* ARRAY_CONTAINS */ === t.op || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === t.op;
        return 2 /* CONTAINS */ === e.kind === n;
    }
    Ue(t, e) {
        return !!t.field.isEqual(e.fieldPath) && (0 /* ASCENDING */ === e.kind && "asc" /* ASCENDING */ === t.dir || 1 /* DESCENDING */ === e.kind && "desc" /* DESCENDING */ === t.dir);
    }
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An in-memory implementation of IndexManager.
 */ class lr {
    constructor() {
        this.qe = new fr;
    }
    addToCollectionParentIndex(t, e) {
        return this.qe.add(e), Ti.resolve();
    }
    getCollectionParents(t, e) {
        return Ti.resolve(this.qe.getEntries(e));
    }
    addFieldIndex(t, e) {
        // Field indices are not supported with memory persistence.
        return Ti.resolve();
    }
    deleteFieldIndex(t, e) {
        // Field indices are not supported with memory persistence.
        return Ti.resolve();
    }
    getDocumentsMatchingTarget(t, e) {
        // Field indices are not supported with memory persistence.
        return Ti.resolve(null);
    }
    getFieldIndex(t, e) {
        // Field indices are not supported with memory persistence.
        return Ti.resolve(null);
    }
    getFieldIndexes(t, e) {
        // Field indices are not supported with memory persistence.
        return Ti.resolve([]);
    }
    getNextCollectionGroupToUpdate(t) {
        // Field indices are not supported with memory persistence.
        return Ti.resolve(null);
    }
    updateCollectionGroup(t, e, n) {
        // Field indices are not supported with memory persistence.
        return Ti.resolve();
    }
    updateIndexEntries(t, e) {
        // Field indices are not supported with memory persistence.
        return Ti.resolve();
    }
}

/**
 * Internal implementation of the collection-parent index exposed by MemoryIndexManager.
 * Also used for in-memory caching by IndexedDbIndexManager and initial index population
 * in indexeddb_schema.ts
 */ class fr {
    constructor() {
        this.index = {};
    }
    // Returns false if the entry already existed.
    add(t) {
        const e = t.lastSegment(), n = t.popLast(), s = this.index[e] || new Gn(wt.comparator), i = !s.has(n);
        return this.index[e] = s.add(n), i;
    }
    has(t) {
        const e = t.lastSegment(), n = t.popLast(), s = this.index[e];
        return s && s.has(n);
    }
    getEntries(t) {
        return (this.index[t] || new Gn(wt.comparator)).toArray();
    }
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const dr = new Uint8Array(0);

/**
 * A persisted implementation of IndexManager.
 *
 * PORTING NOTE: Unlike iOS and Android, the Web SDK does not memoize index
 * data as it supports multi-tab access.
 */
class _r {
    constructor(t, e) {
        this.user = t, this.databaseId = e, 
        /**
         * An in-memory copy of the index entries we've already written since the SDK
         * launched. Used to avoid re-writing the same entry repeatedly.
         *
         * This is *NOT* a complete cache of what's in persistence and so can never be
         * used to satisfy reads.
         */
        this.Ke = new fr, 
        /**
         * Maps from a target to its equivalent list of sub-targets. Each sub-target
         * contains only one term from the target's disjunctive normal form (DNF).
         */
        this.Ge = new Ln((t => me(t)), ((t, e) => ye(t, e))), this.uid = t.uid || "";
    }
    /**
     * Adds a new entry to the collection parent index.
     *
     * Repeated calls for the same collectionPath should be avoided within a
     * transaction as IndexedDbIndexManager only caches writes once a transaction
     * has been committed.
     */    addToCollectionParentIndex(t, e) {
        if (!this.Ke.has(e)) {
            const n = e.lastSegment(), s = e.popLast();
            t.addOnCommittedListener((() => {
                // Add the collection to the in memory cache only if the transaction was
                // successfully committed.
                this.Ke.add(e);
            }));
            const i = {
                collectionId: n,
                parent: Ws(s)
            };
            return wr(t).put(i);
        }
        return Ti.resolve();
    }
    getCollectionParents(t, e) {
        const n = [], s = IDBKeyRange.bound([ e, "" ], [ at(e), "" ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0);
        return wr(t).qt(s).next((t => {
            for (const s of t) {
                // This collectionId guard shouldn't be necessary (and isn't as long
                // as we're running in a real browser), but there's a bug in
                // indexeddbshim that breaks our range in our tests running in node:
                // https://github.com/axemclion/IndexedDBShim/issues/334
                if (s.collectionId !== e) break;
                n.push(Js(s.parent));
            }
            return n;
        }));
    }
    addFieldIndex(t, e) {
        // TODO(indexing): Verify that the auto-incrementing index ID works in
        // Safari & Firefox.
        const n = gr(t), s = function(t) {
            return {
                indexId: t.indexId,
                collectionGroup: t.collectionGroup,
                fields: t.fields.map((t => [ t.fieldPath.canonicalString(), t.kind ]))
            };
        }(e);
        // `indexId` is auto-populated by IndexedDb
        return delete s.indexId, n.add(s).next();
    }
    deleteFieldIndex(t, e) {
        const n = gr(t), s = yr(t), i = mr(t);
        return n.delete(e.indexId).next((() => s.delete(IDBKeyRange.bound([ e.indexId ], [ e.indexId + 1 ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0)))).next((() => i.delete(IDBKeyRange.bound([ e.indexId ], [ e.indexId + 1 ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0))));
    }
    getDocumentsMatchingTarget(t, e) {
        const n = mr(t);
        let s = !0;
        const i = new Map;
        return Ti.forEach(this.Qe(e), (e => this.getFieldIndex(t, e).next((t => {
            s && (s = !!t), i.set(e, t);
        })))).next((() => {
            if (s) {
                let t = ts();
                const s = [];
                return Ti.forEach(i, ((i, r) => {
                    /** Returns a debug representation of the field index */
                    var o;
                    F("IndexedDbIndexManager", `Using index ${o = i, `id=${o.indexId}|cg=${o.collectionGroup}|f=${o.fields.map((t => `${t.fieldPath}:${t.kind}`)).join(",")}`} to execute ${me(e)}`);
                    const u = function(t, e) {
                        const n = oe(e);
                        if (void 0 === n) return null;
                        for (const e of Ie(t, n.fieldPath)) switch (e.op) {
                          case "array-contains-any" /* ARRAY_CONTAINS_ANY */ :
                            return e.value.arrayValue.values || [];

                          case "array-contains" /* ARRAY_CONTAINS */ :
                            return [ e.value ];
                            // Remaining filters are not array filters.
                                                }
                        return null;
                    }
                    /**
 * Returns the list of values that are used in != or NOT_IN filters. Returns
 * `null` if there are no such filters.
 */ (r, i), a = function(t, e) {
                        const n = new Map;
                        for (const s of ue(e)) for (const e of Ie(t, s.fieldPath)) switch (e.op) {
                          case "==" /* EQUAL */ :
                          case "in" /* IN */ :
                            // Encode equality prefix, which is encoded in the index value before
                            // the inequality (e.g. `a == 'a' && b != 'b'` is encoded to
                            // `value != 'ab'`).
                            n.set(s.fieldPath.canonicalString(), e.value);
                            break;

                          case "not-in" /* NOT_IN */ :
                          case "!=" /* NOT_EQUAL */ :
                            // NotIn/NotEqual is always a suffix. There cannot be any remaining
                            // segments and hence we can return early here.
                            return n.set(s.fieldPath.canonicalString(), e.value), Array.from(n.values());
                            // Remaining filters cannot be used as notIn bounds.
                                                }
                        return null;
                    }
                    /**
 * Returns a lower bound of field values that can be used as a starting point to
 * scan the index defined by `fieldIndex`. Returns `null` if no lower bound
 * exists.
 */ (r, i), c = function(t, e) {
                        const n = [];
                        let s = !0;
                        // For each segment, retrieve a lower bound if there is a suitable filter or
                        // startAt.
                                                for (const i of ue(e)) {
                            const e = 0 /* ASCENDING */ === i.kind ? Te(t, i.fieldPath, t.startAt) : Ee(t, i.fieldPath, t.startAt);
                            if (!e.value) 
                            // No lower bound exists
                            return null;
                            n.push(e.value), s && (s = e.inclusive);
                        }
                        return new xe(n, s);
                    }
                    /**
 * Returns an upper bound of field values that can be used as an ending point
 * when scanning the index defined by `fieldIndex`. Returns `null` if no
 * upper bound exists.
 */ (r, i), h = function(t, e) {
                        const n = [];
                        let s = !0;
                        // For each segment, retrieve an upper bound if there is a suitable filter or
                        // endAt.
                                                for (const i of ue(e)) {
                            const e = 0 /* ASCENDING */ === i.kind ? Ee(t, i.fieldPath, t.endAt) : Te(t, i.fieldPath, t.endAt);
                            if (!e.value) 
                            // No upper bound exists
                            return null;
                            n.push(e.value), s && (s = e.inclusive);
                        }
                        return new xe(n, s);
                    }(r, i), l = this.je(i, r, c), f = this.je(i, r, h), d = this.We(i, r, a), _ = this.ze(i.indexId, u, l, !!c && c.inclusive, f, !!h && h.inclusive, d);
                    return Ti.forEach(_, (i => n.Gt(i, e.limit).next((e => {
                        e.forEach((e => {
                            const n = kt.fromSegments(e.documentKey);
                            t.has(n) || (t = t.add(n), s.push(n));
                        }));
                    }))));
                })).next((() => s));
            }
            return Ti.resolve(null);
        }));
    }
    Qe(t) {
        let e = this.Ge.get(t);
        return e || (
        // TODO(orquery): Implement DNF transform
        e = [ t ], this.Ge.set(t, e), e);
    }
    /**
     * Constructs a key range query on `DbIndexEntryStore` that unions all
     * bounds.
     */    ze(t, e, n, s, i, r, o) {
        // The number of total index scans we union together. This is similar to a
        // distributed normal form, but adapted for array values. We create a single
        // index range per value in an ARRAY_CONTAINS or ARRAY_CONTAINS_ANY filter
        // combined with the values from the query bounds.
        const u = (null != e ? e.length : 1) * Math.max(null != n ? n.length : 1, null != i ? i.length : 1), a = u / (null != e ? e.length : 1), c = [];
        for (let h = 0; h < u; ++h) {
            const u = e ? this.He(e[h / a]) : dr, l = n ? this.Je(t, u, n[h % a], s) : this.Ye(t), f = i ? this.Xe(t, u, i[h % a], r) : this.Ye(t + 1);
            c.push(...this.createRange(l, f, o.map((e => this.Je(t, u, e, 
            /* inclusive= */ !0)))));
        }
        return c;
    }
    /** Generates the lower bound for `arrayValue` and `directionalValue`. */    Je(t, e, n, s) {
        const i = new ur(t, kt.empty(), e, n);
        return s ? i : i.ke();
    }
    /** Generates the upper bound for `arrayValue` and `directionalValue`. */    Xe(t, e, n, s) {
        const i = new ur(t, kt.empty(), e, n);
        return s ? i.ke() : i;
    }
    /**
     * Generates an empty bound that scopes the index scan to the current index
     * and user.
     */    Ye(t) {
        return new ur(t, kt.empty(), dr, dr);
    }
    getFieldIndex(t, e) {
        const n = new hr(e), s = null != e.collectionGroup ? e.collectionGroup : e.path.lastSegment();
        return this.getFieldIndexes(t, s).next((t => {
            const e = t.filter((t => n.$e(t)));
            // Return the index that matches the most number of segments.
                        return e.sort(((t, e) => e.fields.length - t.fields.length)), e.length > 0 ? e[0] : null;
        }));
    }
    /**
     * Returns the byte encoded form of the directional values in the field index.
     * Returns `null` if the document does not have all fields specified in the
     * index.
     */    Ze(t, e) {
        const n = new or;
        for (const s of ue(t)) {
            const t = e.data.field(s.fieldPath);
            if (null == t) return null;
            const i = n.Ne(s.kind);
            tr.fe.Zt(t, i);
        }
        return n.Se();
    }
    /** Encodes a single value to the ascending index format. */    He(t) {
        const e = new or;
        return tr.fe.Zt(t, e.Ne(0 /* ASCENDING */)), e.Se();
    }
    /**
     * Returns an encoded form of the document key that sorts based on the key
     * ordering of the field index.
     */    tn(t, e) {
        const n = new or;
        return tr.fe.Zt(Gt(this.databaseId, e), n.Ne(function(t) {
            const e = ue(t);
            return 0 === e.length ? 0 /* ASCENDING */ : e[e.length - 1].kind;
        }(t))), n.Se();
    }
    /**
     * Encodes the given field values according to the specification in `target`.
     * For IN queries, a list of possible values is returned.
     */    We(t, e, n) {
        if (null === n) return [];
        let s = [];
        s.push(new or);
        let i = 0;
        for (const r of ue(t)) {
            const t = n[i++];
            for (const n of s) if (this.en(e, r.fieldPath) && jt(t)) s = this.nn(s, r, t); else {
                const e = n.Ne(r.kind);
                tr.fe.Zt(t, e);
            }
        }
        return this.sn(s);
    }
    /**
     * Encodes the given bounds according to the specification in `target`. For IN
     * queries, a list of possible values is returned.
     */    je(t, e, n) {
        return null == n ? null : this.We(t, e, n.position);
    }
    /** Returns the byte representation for the provided encoders. */    sn(t) {
        const e = [];
        for (let n = 0; n < t.length; ++n) e[n] = t[n].Se();
        return e;
    }
    /**
     * Creates a separate encoder for each element of an array.
     *
     * The method appends each value to all existing encoders (e.g. filter("a",
     * "==", "a1").filter("b", "in", ["b1", "b2"]) becomes ["a1,b1", "a1,b2"]). A
     * list of new encoders is returned.
     */    nn(t, e, n) {
        const s = [ ...t ], i = [];
        for (const t of n.arrayValue.values || []) for (const n of s) {
            const s = new or;
            s.seed(n.Se()), tr.fe.Zt(t, s.Ne(e.kind)), i.push(s);
        }
        return i;
    }
    en(t, e) {
        return !!t.filters.find((t => t instanceof Ae && t.field.isEqual(e) && ("in" /* IN */ === t.op || "not-in" /* NOT_IN */ === t.op)));
    }
    getFieldIndexes(t, e) {
        const n = gr(t), s = yr(t);
        return (e ? n.qt("collectionGroupIndex", IDBKeyRange.bound(e, e)) : n.qt()).next((t => {
            const e = [];
            return Ti.forEach(t, (t => s.get([ t.indexId, this.uid ]).next((n => {
                e.push(function(t, e) {
                    const n = e ? new ce(e.sequenceNumber, new fe(qi(e.readTime), new kt(Js(e.documentKey)), e.largestBatchId)) : ce.empty(), s = t.fields.map((([t, e]) => new ae(gt.fromServerFormat(t), e)));
                    return new re(t.indexId, t.collectionGroup, s, n);
                }(t, n));
            })))).next((() => e));
        }));
    }
    getNextCollectionGroupToUpdate(t) {
        return this.getFieldIndexes(t).next((t => 0 === t.length ? null : (t.sort(((t, e) => {
            const n = t.indexState.sequenceNumber - e.indexState.sequenceNumber;
            return 0 !== n ? n : ot(t.collectionGroup, e.collectionGroup);
        })), t[0].collectionGroup)));
    }
    updateCollectionGroup(t, e, n) {
        const s = gr(t), i = yr(t);
        return this.rn(t).next((t => s.qt("collectionGroupIndex", IDBKeyRange.bound(e, e)).next((e => Ti.forEach(e, (e => i.put(function(t, e, n, s) {
            return {
                indexId: t,
                uid: e.uid || "",
                sequenceNumber: n,
                readTime: Ui(s.readTime),
                documentKey: Ws(s.documentKey.path),
                largestBatchId: s.largestBatchId
            };
        }(e.indexId, this.user, t, n))))))));
    }
    updateIndexEntries(t, e) {
        // Porting Note: `getFieldIndexes()` on Web does not cache index lookups as
        // it could be used across different IndexedDB transactions. As any cached
        // data might be invalidated by other multi-tab clients, we can only trust
        // data within a single IndexedDB transaction. We therefore add a cache
        // here.
        const n = new Map;
        return Ti.forEach(e, ((e, s) => {
            const i = n.get(e.collectionGroup);
            return (i ? Ti.resolve(i) : this.getFieldIndexes(t, e.collectionGroup)).next((i => (n.set(e.collectionGroup, i), 
            Ti.forEach(i, (n => this.on(t, e, n).next((e => {
                const i = this.un(s, n);
                return e.isEqual(i) ? Ti.resolve() : this.an(t, s, n, e, i);
            })))))));
        }));
    }
    cn(t, e, n, s) {
        return mr(t).put({
            indexId: s.indexId,
            uid: this.uid,
            arrayValue: s.arrayValue,
            directionalValue: s.directionalValue,
            orderedDocumentKey: this.tn(n, e.key),
            documentKey: e.key.path.toArray()
        });
    }
    hn(t, e, n, s) {
        return mr(t).delete([ s.indexId, this.uid, s.arrayValue, s.directionalValue, this.tn(n, e.key), e.key.path.toArray() ]);
    }
    on(t, e, n) {
        const s = mr(t);
        let i = new Gn(ar);
        return s.Wt({
            index: "documentKeyIndex",
            range: IDBKeyRange.only([ n.indexId, this.uid, this.tn(n, e) ])
        }, ((t, s) => {
            i = i.add(new ur(n.indexId, e, s.arrayValue, s.directionalValue));
        })).next((() => i));
    }
    /** Creates the index entries for the given document. */    un(t, e) {
        let n = new Gn(ar);
        const s = this.Ze(e, t);
        if (null == s) return n;
        const i = oe(e);
        if (null != i) {
            const r = t.data.field(i.fieldPath);
            if (jt(r)) for (const i of r.arrayValue.values || []) n = n.add(new ur(e.indexId, t.key, this.He(i), s));
        } else n = n.add(new ur(e.indexId, t.key, dr, s));
        return n;
    }
    /**
     * Updates the index entries for the provided document by deleting entries
     * that are no longer referenced in `newEntries` and adding all newly added
     * entries.
     */    an(t, e, n, s, i) {
        F("IndexedDbIndexManager", "Updating index entries for document '%s'", e.key);
        const r = [];
        return function(t, e, n, s, i) {
            const r = t.getIterator(), o = e.getIterator();
            let u = jn(r), a = jn(o);
            // Walk through the two sets at the same time, using the ordering defined by
            // `comparator`.
            for (;u || a; ) {
                let t = !1, e = !1;
                if (u && a) {
                    const s = n(u, a);
                    s < 0 ? 
                    // The element was removed if the next element in our ordered
                    // walkthrough is only in `before`.
                    e = !0 : s > 0 && (
                    // The element was added if the next element in our ordered walkthrough
                    // is only in `after`.
                    t = !0);
                } else null != u ? e = !0 : t = !0;
                t ? (s(a), a = jn(o)) : e ? (i(u), u = jn(r)) : (u = jn(r), a = jn(o));
            }
        }(s, i, ar, (
        /* onAdd= */ s => {
            r.push(this.cn(t, e, n, s));
        }), (
        /* onRemove= */ s => {
            r.push(this.hn(t, e, n, s));
        })), Ti.waitFor(r);
    }
    rn(t) {
        let e = 1;
        return yr(t).Wt({
            index: "sequenceNumberIndex",
            reverse: !0,
            range: IDBKeyRange.upperBound([ this.uid, Number.MAX_SAFE_INTEGER ])
        }, ((t, n, s) => {
            s.done(), e = n.sequenceNumber + 1;
        })).next((() => e));
    }
    /**
     * Returns a new set of IDB ranges that splits the existing range and excludes
     * any values that match the `notInValue` from these ranges. As an example,
     * '[foo > 2 && foo != 3]` becomes  `[foo > 2 && < 3, foo > 3]`.
     */    createRange(t, e, n) {
        // The notIb values need to be sorted and unique so that we can return a
        // sorted set of non-overlapping ranges.
        n = n.sort(((t, e) => ar(t, e))).filter(((t, e, n) => !e || 0 !== ar(t, n[e - 1])));
        const s = [];
        s.push(t);
        for (const i of n) {
            const n = ar(i, t), r = ar(i, e);
            if (0 === n) 
            // `notInValue` is the lower bound. We therefore need to raise the bound
            // to the next value.
            s[0] = t.ke(); else if (n > 0 && r < 0) 
            // `notInValue` is in the middle of the range
            s.push(i), s.push(i.ke()); else if (r > 0) 
            // `notInValue` (and all following values) are out of the range
            break;
        }
        s.push(e);
        const i = [];
        for (let t = 0; t < s.length; t += 2) i.push(IDBKeyRange.bound([ s[t].indexId, this.uid, s[t].arrayValue, s[t].directionalValue, dr, [] ], [ s[t + 1].indexId, this.uid, s[t + 1].arrayValue, s[t + 1].directionalValue, dr, [] ]));
        return i;
    }
}

/**
 * Helper to get a typed SimpleDbStore for the collectionParents
 * document store.
 */ function wr(t) {
    return xi(t, "collectionParents");
}

/**
 * Helper to get a typed SimpleDbStore for the index entry object store.
 */ function mr(t) {
    return xi(t, "indexEntries");
}

/**
 * Helper to get a typed SimpleDbStore for the index configuration object store.
 */ function gr(t) {
    return xi(t, "indexConfiguration");
}

/**
 * Helper to get a typed SimpleDbStore for the index state object store.
 */ function yr(t) {
    return xi(t, "indexState");
}

/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const pr = {
    didRun: !1,
    sequenceNumbersCollected: 0,
    targetsRemoved: 0,
    documentsRemoved: 0
};

class Ir {
    constructor(
    // When we attempt to collect, we will only do so if the cache size is greater than this
    // threshold. Passing `COLLECTION_DISABLED` here will cause collection to always be skipped.
    t, 
    // The percentage of sequence numbers that we will attempt to collect
    e, 
    // A cap on the total number of sequence numbers that will be collected. This prevents
    // us from collecting a huge number of sequence numbers if the cache has grown very large.
    n) {
        this.cacheSizeCollectionThreshold = t, this.percentileToCollect = e, this.maximumSequenceNumbersToCollect = n;
    }
    static withCacheSize(t) {
        return new Ir(t, Ir.DEFAULT_COLLECTION_PERCENTILE, Ir.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT);
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Delete a mutation batch and the associated document mutations.
 * @returns A PersistencePromise of the document mutations that were removed.
 */
function Tr(t, e, n) {
    const s = t.store("mutations"), i = t.store("documentMutations"), r = [], o = IDBKeyRange.only(n.batchId);
    let u = 0;
    const a = s.Wt({
        range: o
    }, ((t, e, n) => (u++, n.delete())));
    r.push(a.next((() => {
        q(1 === u);
    })));
    const c = [];
    for (const t of n.mutations) {
        const s = Zs(e, t.key.path, n.batchId);
        r.push(i.delete(s)), c.push(t.key);
    }
    return Ti.waitFor(r).next((() => c));
}

/**
 * Returns an approximate size for the given document.
 */ function Er(t) {
    if (!t) return 0;
    let e;
    if (t.document) e = t.document; else if (t.unknownDocument) e = t.unknownDocument; else {
        if (!t.noDocument) throw U();
        e = t.noDocument;
    }
    return JSON.stringify(e).length;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** A mutation queue for a specific user, backed by IndexedDB. */ Ir.DEFAULT_COLLECTION_PERCENTILE = 10, 
Ir.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3, Ir.DEFAULT = new Ir(41943040, Ir.DEFAULT_COLLECTION_PERCENTILE, Ir.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT), 
Ir.DISABLED = new Ir(-1, 0, 0);

class Ar {
    constructor(
    /**
     * The normalized userId (e.g. null UID => "" userId) used to store /
     * retrieve mutations.
     */
    t, e, n, s) {
        this.userId = t, this.M = e, this.indexManager = n, this.referenceDelegate = s, 
        /**
         * Caches the document keys for pending mutation batches. If the mutation
         * has been removed from IndexedDb, the cached value may continue to
         * be used to retrieve the batch's document keys. To remove a cached value
         * locally, `removeCachedMutationKeys()` should be invoked either directly
         * or through `removeMutationBatches()`.
         *
         * With multi-tab, when the primary client acknowledges or rejects a mutation,
         * this cache is used by secondary clients to invalidate the local
         * view of the documents that were previously affected by the mutation.
         */
        // PORTING NOTE: Multi-tab only.
        this.ln = {};
    }
    /**
     * Creates a new mutation queue for the given user.
     * @param user - The user for which to create a mutation queue.
     * @param serializer - The serializer to use when persisting to IndexedDb.
     */    static Yt(t, e, n, s) {
        // TODO(mcg): Figure out what constraints there are on userIDs
        // In particular, are there any reserved characters? are empty ids allowed?
        // For the moment store these together in the same mutations table assuming
        // that empty userIDs aren't allowed.
        q("" !== t.uid);
        const i = t.isAuthenticated() ? t.uid : "";
        return new Ar(i, e, n, s);
    }
    checkEmpty(t) {
        let e = !0;
        const n = IDBKeyRange.bound([ this.userId, Number.NEGATIVE_INFINITY ], [ this.userId, Number.POSITIVE_INFINITY ]);
        return Pr(t).Wt({
            index: "userMutationsIndex",
            range: n
        }, ((t, n, s) => {
            e = !1, s.done();
        })).next((() => e));
    }
    addMutationBatch(t, e, n, s) {
        const i = br(t), r = Pr(t);
        // The IndexedDb implementation in Chrome (and Firefox) does not handle
        // compound indices that include auto-generated keys correctly. To ensure
        // that the index entry is added correctly in all browsers, we perform two
        // writes: The first write is used to retrieve the next auto-generated Batch
        // ID, and the second write populates the index and stores the actual
        // mutation batch.
        // See: https://bugs.chromium.org/p/chromium/issues/detail?id=701972
        // We write an empty object to obtain key
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return r.add({}).next((o => {
            q("number" == typeof o);
            const u = new Ni(o, e, n, s), a = function(t, e, n) {
                const s = n.baseMutations.map((e => Cs(t.Jt, e))), i = n.mutations.map((e => Cs(t.Jt, e)));
                return {
                    userId: e,
                    batchId: n.batchId,
                    localWriteTimeMs: n.localWriteTime.toMillis(),
                    baseMutations: s,
                    mutations: i
                };
            }(this.M, this.userId, u), c = [];
            let h = new Gn(((t, e) => ot(t.canonicalString(), e.canonicalString())));
            for (const t of s) {
                const e = Zs(this.userId, t.key.path, o);
                h = h.add(t.key.path.popLast()), c.push(r.put(a)), c.push(i.put(e, ti));
            }
            return h.forEach((e => {
                c.push(this.indexManager.addToCollectionParentIndex(t, e));
            })), t.addOnCommittedListener((() => {
                this.ln[o] = u.keys();
            })), Ti.waitFor(c).next((() => u));
        }));
    }
    lookupMutationBatch(t, e) {
        return Pr(t).get(e).next((t => t ? (q(t.userId === this.userId), Ki(this.M, t)) : null));
    }
    /**
     * Returns the document keys for the mutation batch with the given batchId.
     * For primary clients, this method returns `null` after
     * `removeMutationBatches()` has been called. Secondary clients return a
     * cached result until `removeCachedMutationKeys()` is invoked.
     */
    // PORTING NOTE: Multi-tab only.
    fn(t, e) {
        return this.ln[e] ? Ti.resolve(this.ln[e]) : this.lookupMutationBatch(t, e).next((t => {
            if (t) {
                const n = t.keys();
                return this.ln[e] = n, n;
            }
            return null;
        }));
    }
    getNextMutationBatchAfterBatchId(t, e) {
        const n = e + 1, s = IDBKeyRange.lowerBound([ this.userId, n ]);
        let i = null;
        return Pr(t).Wt({
            index: "userMutationsIndex",
            range: s
        }, ((t, e, s) => {
            e.userId === this.userId && (q(e.batchId >= n), i = Ki(this.M, e)), s.done();
        })).next((() => i));
    }
    getHighestUnacknowledgedBatchId(t) {
        const e = IDBKeyRange.upperBound([ this.userId, Number.POSITIVE_INFINITY ]);
        let n = -1;
        return Pr(t).Wt({
            index: "userMutationsIndex",
            range: e,
            reverse: !0
        }, ((t, e, s) => {
            n = e.batchId, s.done();
        })).next((() => n));
    }
    getAllMutationBatches(t) {
        const e = IDBKeyRange.bound([ this.userId, -1 ], [ this.userId, Number.POSITIVE_INFINITY ]);
        return Pr(t).qt("userMutationsIndex", e).next((t => t.map((t => Ki(this.M, t)))));
    }
    getAllMutationBatchesAffectingDocumentKey(t, e) {
        // Scan the document-mutation index starting with a prefix starting with
        // the given documentKey.
        const n = Xs(this.userId, e.path), s = IDBKeyRange.lowerBound(n), i = [];
        return br(t).Wt({
            range: s
        }, ((n, s, r) => {
            const [o, u, a] = n, c = Js(u);
            // Only consider rows matching exactly the specific key of
            // interest. Note that because we order by path first, and we
            // order terminators before path separators, we'll encounter all
            // the index rows for documentKey contiguously. In particular, all
            // the rows for documentKey will occur before any rows for
            // documents nested in a subcollection beneath documentKey so we
            // can stop as soon as we hit any such row.
                        if (o === this.userId && e.path.isEqual(c)) 
            // Look up the mutation batch in the store.
            return Pr(t).get(a).next((t => {
                if (!t) throw U();
                q(t.userId === this.userId), i.push(Ki(this.M, t));
            }));
            r.done();
        })).next((() => i));
    }
    getAllMutationBatchesAffectingDocumentKeys(t, e) {
        let n = new Gn(ot);
        const s = [];
        return e.forEach((e => {
            const i = Xs(this.userId, e.path), r = IDBKeyRange.lowerBound(i), o = br(t).Wt({
                range: r
            }, ((t, s, i) => {
                const [r, o, u] = t, a = Js(o);
                // Only consider rows matching exactly the specific key of
                // interest. Note that because we order by path first, and we
                // order terminators before path separators, we'll encounter all
                // the index rows for documentKey contiguously. In particular, all
                // the rows for documentKey will occur before any rows for
                // documents nested in a subcollection beneath documentKey so we
                // can stop as soon as we hit any such row.
                                r === this.userId && e.path.isEqual(a) ? n = n.add(u) : i.done();
            }));
            s.push(o);
        })), Ti.waitFor(s).next((() => this.dn(t, n)));
    }
    getAllMutationBatchesAffectingQuery(t, e) {
        const n = e.path, s = n.length + 1, i = Xs(this.userId, n), r = IDBKeyRange.lowerBound(i);
        // Collect up unique batchIDs encountered during a scan of the index. Use a
        // SortedSet to accumulate batch IDs so they can be traversed in order in a
        // scan of the main table.
        let o = new Gn(ot);
        return br(t).Wt({
            range: r
        }, ((t, e, i) => {
            const [r, u, a] = t, c = Js(u);
            r === this.userId && n.isPrefixOf(c) ? 
            // Rows with document keys more than one segment longer than the
            // query path can't be matches. For example, a query on 'rooms'
            // can't match the document /rooms/abc/messages/xyx.
            // TODO(mcg): we'll need a different scanner when we implement
            // ancestor queries.
            c.length === s && (o = o.add(a)) : i.done();
        })).next((() => this.dn(t, o)));
    }
    dn(t, e) {
        const n = [], s = [];
        // TODO(rockwood): Implement this using iterate.
        return e.forEach((e => {
            s.push(Pr(t).get(e).next((t => {
                if (null === t) throw U();
                q(t.userId === this.userId), n.push(Ki(this.M, t));
            })));
        })), Ti.waitFor(s).next((() => n));
    }
    removeMutationBatch(t, e) {
        return Tr(t.Ht, this.userId, e).next((n => (t.addOnCommittedListener((() => {
            this._n(e.batchId);
        })), Ti.forEach(n, (e => this.referenceDelegate.markPotentiallyOrphaned(t, e))))));
    }
    /**
     * Clears the cached keys for a mutation batch. This method should be
     * called by secondary clients after they process mutation updates.
     *
     * Note that this method does not have to be called from primary clients as
     * the corresponding cache entries are cleared when an acknowledged or
     * rejected batch is removed from the mutation queue.
     */
    // PORTING NOTE: Multi-tab only
    _n(t) {
        delete this.ln[t];
    }
    performConsistencyCheck(t) {
        return this.checkEmpty(t).next((e => {
            if (!e) return Ti.resolve();
            // Verify that there are no entries in the documentMutations index if
            // the queue is empty.
                        const n = IDBKeyRange.lowerBound([ this.userId ]);
            const s = [];
            return br(t).Wt({
                range: n
            }, ((t, e, n) => {
                if (t[0] === this.userId) {
                    const e = Js(t[1]);
                    s.push(e);
                } else n.done();
            })).next((() => {
                q(0 === s.length);
            }));
        }));
    }
    containsKey(t, e) {
        return Rr(t, this.userId, e);
    }
    // PORTING NOTE: Multi-tab only (state is held in memory in other clients).
    /** Returns the mutation queue's metadata from IndexedDb. */
    wn(t) {
        return Vr(t).get(this.userId).next((t => t || {
            userId: this.userId,
            lastAcknowledgedBatchId: -1,
            lastStreamToken: ""
        }));
    }
}

/**
 * @returns true if the mutation queue for the given user contains a pending
 *         mutation for the given key.
 */ function Rr(t, e, n) {
    const s = Xs(e, n.path), i = s[1], r = IDBKeyRange.lowerBound(s);
    let o = !1;
    return br(t).Wt({
        range: r,
        jt: !0
    }, ((t, n, s) => {
        const [r, u, /*batchID*/ a] = t;
        r === e && u === i && (o = !0), s.done();
    })).next((() => o));
}

/** Returns true if any mutation queue contains the given document. */
/**
 * Helper to get a typed SimpleDbStore for the mutations object store.
 */
function Pr(t) {
    return xi(t, "mutations");
}

/**
 * Helper to get a typed SimpleDbStore for the mutationQueues object store.
 */ function br(t) {
    return xi(t, "documentMutations");
}

/**
 * Helper to get a typed SimpleDbStore for the mutationQueues object store.
 */ function Vr(t) {
    return xi(t, "mutationQueues");
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Offset to ensure non-overlapping target ids. */
/**
 * Generates monotonically increasing target IDs for sending targets to the
 * watch stream.
 *
 * The client constructs two generators, one for the target cache, and one for
 * for the sync engine (to generate limbo documents targets). These
 * generators produce non-overlapping IDs (by using even and odd IDs
 * respectively).
 *
 * By separating the target ID space, the query cache can generate target IDs
 * that persist across client restarts, while sync engine can independently
 * generate in-memory target IDs that are transient and can be reused after a
 * restart.
 */
class vr {
    constructor(t) {
        this.mn = t;
    }
    next() {
        return this.mn += 2, this.mn;
    }
    static gn() {
        // The target cache generator must return '2' in its first call to `next()`
        // as there is no differentiation in the protocol layer between an unset
        // number and the number '0'. If we were to sent a target with target ID
        // '0', the backend would consider it unset and replace it with its own ID.
        return new vr(0);
    }
    static yn() {
        // Sync engine assigns target IDs for limbo document detection.
        return new vr(-1);
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Sr {
    constructor(t, e) {
        this.referenceDelegate = t, this.M = e;
    }
    // PORTING NOTE: We don't cache global metadata for the target cache, since
    // some of it (in particular `highestTargetId`) can be modified by secondary
    // tabs. We could perhaps be more granular (and e.g. still cache
    // `lastRemoteSnapshotVersion` in memory) but for simplicity we currently go
    // to IndexedDb whenever we need to read metadata. We can revisit if it turns
    // out to have a meaningful performance impact.
    allocateTargetId(t) {
        return this.pn(t).next((e => {
            const n = new vr(e.highestTargetId);
            return e.highestTargetId = n.next(), this.In(t, e).next((() => e.highestTargetId));
        }));
    }
    getLastRemoteSnapshotVersion(t) {
        return this.pn(t).next((t => ht.fromTimestamp(new ct(t.lastRemoteSnapshotVersion.seconds, t.lastRemoteSnapshotVersion.nanoseconds))));
    }
    getHighestSequenceNumber(t) {
        return this.pn(t).next((t => t.highestListenSequenceNumber));
    }
    setTargetsMetadata(t, e, n) {
        return this.pn(t).next((s => (s.highestListenSequenceNumber = e, n && (s.lastRemoteSnapshotVersion = n.toTimestamp()), 
        e > s.highestListenSequenceNumber && (s.highestListenSequenceNumber = e), this.In(t, s))));
    }
    addTargetData(t, e) {
        return this.Tn(t, e).next((() => this.pn(t).next((n => (n.targetCount += 1, this.En(e, n), 
        this.In(t, n))))));
    }
    updateTargetData(t, e) {
        return this.Tn(t, e);
    }
    removeTargetData(t, e) {
        return this.removeMatchingKeysForTargetId(t, e.targetId).next((() => Dr(t).delete(e.targetId))).next((() => this.pn(t))).next((e => (q(e.targetCount > 0), 
        e.targetCount -= 1, this.In(t, e))));
    }
    /**
     * Drops any targets with sequence number less than or equal to the upper bound, excepting those
     * present in `activeTargetIds`. Document associations for the removed targets are also removed.
     * Returns the number of targets removed.
     */    removeTargets(t, e, n) {
        let s = 0;
        const i = [];
        return Dr(t).Wt(((r, o) => {
            const u = Gi(o);
            u.sequenceNumber <= e && null === n.get(u.targetId) && (s++, i.push(this.removeTargetData(t, u)));
        })).next((() => Ti.waitFor(i))).next((() => s));
    }
    /**
     * Call provided function with each `TargetData` that we have cached.
     */    forEachTarget(t, e) {
        return Dr(t).Wt(((t, n) => {
            const s = Gi(n);
            e(s);
        }));
    }
    pn(t) {
        return Cr(t).get("targetGlobalKey").next((t => (q(null !== t), t)));
    }
    In(t, e) {
        return Cr(t).put("targetGlobalKey", e);
    }
    Tn(t, e) {
        return Dr(t).put(Qi(this.M, e));
    }
    /**
     * In-place updates the provided metadata to account for values in the given
     * TargetData. Saving is done separately. Returns true if there were any
     * changes to the metadata.
     */    En(t, e) {
        let n = !1;
        return t.targetId > e.highestTargetId && (e.highestTargetId = t.targetId, n = !0), 
        t.sequenceNumber > e.highestListenSequenceNumber && (e.highestListenSequenceNumber = t.sequenceNumber, 
        n = !0), n;
    }
    getTargetCount(t) {
        return this.pn(t).next((t => t.targetCount));
    }
    getTargetData(t, e) {
        // Iterating by the canonicalId may yield more than one result because
        // canonicalId values are not required to be unique per target. This query
        // depends on the queryTargets index to be efficient.
        const n = me(e), s = IDBKeyRange.bound([ n, Number.NEGATIVE_INFINITY ], [ n, Number.POSITIVE_INFINITY ]);
        let i = null;
        return Dr(t).Wt({
            range: s,
            index: "queryTargetsIndex"
        }, ((t, n, s) => {
            const r = Gi(n);
            // After finding a potential match, check that the target is
            // actually equal to the requested target.
                        ye(e, r.target) && (i = r, s.done());
        })).next((() => i));
    }
    addMatchingKeys(t, e, n) {
        // PORTING NOTE: The reverse index (documentsTargets) is maintained by
        // IndexedDb.
        const s = [], i = xr(t);
        return e.forEach((e => {
            const r = Ws(e.path);
            s.push(i.put({
                targetId: n,
                path: r
            })), s.push(this.referenceDelegate.addReference(t, n, e));
        })), Ti.waitFor(s);
    }
    removeMatchingKeys(t, e, n) {
        // PORTING NOTE: The reverse index (documentsTargets) is maintained by
        // IndexedDb.
        const s = xr(t);
        return Ti.forEach(e, (e => {
            const i = Ws(e.path);
            return Ti.waitFor([ s.delete([ n, i ]), this.referenceDelegate.removeReference(t, n, e) ]);
        }));
    }
    removeMatchingKeysForTargetId(t, e) {
        const n = xr(t), s = IDBKeyRange.bound([ e ], [ e + 1 ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0);
        return n.delete(s);
    }
    getMatchingKeysForTargetId(t, e) {
        const n = IDBKeyRange.bound([ e ], [ e + 1 ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0), s = xr(t);
        let i = ts();
        return s.Wt({
            range: n,
            jt: !0
        }, ((t, e, n) => {
            const s = Js(t[1]), r = new kt(s);
            i = i.add(r);
        })).next((() => i));
    }
    containsKey(t, e) {
        const n = Ws(e.path), s = IDBKeyRange.bound([ n ], [ at(n) ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0);
        let i = 0;
        return xr(t).Wt({
            index: "documentTargetsIndex",
            jt: !0,
            range: s
        }, (([t, e], n, s) => {
            // Having a sentinel row for a document does not count as containing that document;
            // For the target cache, containing the document means the document is part of some
            // target.
            0 !== t && (i++, s.done());
        })).next((() => i > 0));
    }
    /**
     * Looks up a TargetData entry by target ID.
     *
     * @param targetId - The target ID of the TargetData entry to look up.
     * @returns The cached TargetData entry, or null if the cache has no entry for
     * the target.
     */
    // PORTING NOTE: Multi-tab only.
    Et(t, e) {
        return Dr(t).get(e).next((t => t ? Gi(t) : null));
    }
}

/**
 * Helper to get a typed SimpleDbStore for the queries object store.
 */ function Dr(t) {
    return xi(t, "targets");
}

/**
 * Helper to get a typed SimpleDbStore for the target globals object store.
 */ function Cr(t) {
    return xi(t, "targetGlobal");
}

/**
 * Helper to get a typed SimpleDbStore for the document target object store.
 */ function xr(t) {
    return xi(t, "targetDocuments");
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Verifies the error thrown by a LocalStore operation. If a LocalStore
 * operation fails because the primary lease has been taken by another client,
 * we ignore the error (the persistence layer will immediately call
 * `applyPrimaryLease` to propagate the primary state change). All other errors
 * are re-thrown.
 *
 * @param err - An error returned by a LocalStore operation.
 * @returns A Promise that resolves after we recovered, or the original error.
 */ async function Nr(t) {
    if (t.code !== Q.FAILED_PRECONDITION || t.message !== pi) throw t;
    F("LocalStore", "Unexpectedly lost primary lease");
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function kr([t, e], [n, s]) {
    const i = ot(t, n);
    return 0 === i ? ot(e, s) : i;
}

/**
 * Used to calculate the nth sequence number. Keeps a rolling buffer of the
 * lowest n values passed to `addElement`, and finally reports the largest of
 * them in `maxValue`.
 */ class Mr {
    constructor(t) {
        this.An = t, this.buffer = new Gn(kr), this.Rn = 0;
    }
    Pn() {
        return ++this.Rn;
    }
    bn(t) {
        const e = [ t, this.Pn() ];
        if (this.buffer.size < this.An) this.buffer = this.buffer.add(e); else {
            const t = this.buffer.last();
            kr(e, t) < 0 && (this.buffer = this.buffer.delete(t).add(e));
        }
    }
    get maxValue() {
        // Guaranteed to be non-empty. If we decide we are not collecting any
        // sequence numbers, nthSequenceNumber below short-circuits. If we have
        // decided that we are collecting n sequence numbers, it's because n is some
        // percentage of the existing sequence numbers. That means we should never
        // be in a situation where we are collecting sequence numbers but don't
        // actually have any.
        return this.buffer.last()[0];
    }
}

/**
 * This class is responsible for the scheduling of LRU garbage collection. It handles checking
 * whether or not GC is enabled, as well as which delay to use before the next run.
 */ class Or {
    constructor(t, e) {
        this.garbageCollector = t, this.asyncQueue = e, this.Vn = !1, this.vn = null;
    }
    start(t) {
        -1 !== this.garbageCollector.params.cacheSizeCollectionThreshold && this.Sn(t);
    }
    stop() {
        this.vn && (this.vn.cancel(), this.vn = null);
    }
    get started() {
        return null !== this.vn;
    }
    Sn(t) {
        const e = this.Vn ? 3e5 : 6e4;
        F("LruGarbageCollector", `Garbage collection scheduled in ${e}ms`), this.vn = this.asyncQueue.enqueueAfterDelay("lru_garbage_collection" /* LruGarbageCollection */ , e, (async () => {
            this.vn = null, this.Vn = !0;
            try {
                await t.collectGarbage(this.garbageCollector);
            } catch (t) {
                bi(t) ? F("LruGarbageCollector", "Ignoring IndexedDB error during garbage collection: ", t) : await Nr(t);
            }
            await this.Sn(t);
        }));
    }
}

/** Implements the steps for LRU garbage collection. */ class Fr {
    constructor(t, e) {
        this.Dn = t, this.params = e;
    }
    calculateTargetCount(t, e) {
        return this.Dn.Cn(t).next((t => Math.floor(e / 100 * t)));
    }
    nthSequenceNumber(t, e) {
        if (0 === e) return Ti.resolve(st.A);
        const n = new Mr(e);
        return this.Dn.forEachTarget(t, (t => n.bn(t.sequenceNumber))).next((() => this.Dn.xn(t, (t => n.bn(t))))).next((() => n.maxValue));
    }
    removeTargets(t, e, n) {
        return this.Dn.removeTargets(t, e, n);
    }
    removeOrphanedDocuments(t, e) {
        return this.Dn.removeOrphanedDocuments(t, e);
    }
    collect(t, e) {
        return -1 === this.params.cacheSizeCollectionThreshold ? (F("LruGarbageCollector", "Garbage collection skipped; disabled"), 
        Ti.resolve(pr)) : this.getCacheSize(t).next((n => n < this.params.cacheSizeCollectionThreshold ? (F("LruGarbageCollector", `Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`), 
        pr) : this.Nn(t, e)));
    }
    getCacheSize(t) {
        return this.Dn.getCacheSize(t);
    }
    Nn(t, e) {
        let n, s, i, r, o, a, c;
        const h = Date.now();
        return this.calculateTargetCount(t, this.params.percentileToCollect).next((e => (
        // Cap at the configured max
        e > this.params.maximumSequenceNumbersToCollect ? (F("LruGarbageCollector", `Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${e}`), 
        s = this.params.maximumSequenceNumbersToCollect) : s = e, r = Date.now(), this.nthSequenceNumber(t, s)))).next((s => (n = s, 
        o = Date.now(), this.removeTargets(t, n, e)))).next((e => (i = e, a = Date.now(), 
        this.removeOrphanedDocuments(t, n)))).next((t => {
            if (c = Date.now(), M() <= u.DEBUG) {
                F("LruGarbageCollector", `LRU Garbage Collection\n\tCounted targets in ${r - h}ms\n\tDetermined least recently used ${s} in ` + (o - r) + "ms\n" + `\tRemoved ${i} targets in ` + (a - o) + "ms\n" + `\tRemoved ${t} documents in ` + (c - a) + "ms\n" + `Total Duration: ${c - h}ms`);
            }
            return Ti.resolve({
                didRun: !0,
                sequenceNumbersCollected: s,
                targetsRemoved: i,
                documentsRemoved: t
            });
        }));
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Provides LRU functionality for IndexedDB persistence. */
class $r {
    constructor(t, e) {
        this.db = t, this.garbageCollector = function(t, e) {
            return new Fr(t, e);
        }(this, e);
    }
    Cn(t) {
        const e = this.kn(t);
        return this.db.getTargetCache().getTargetCount(t).next((t => e.next((e => t + e))));
    }
    kn(t) {
        let e = 0;
        return this.xn(t, (t => {
            e++;
        })).next((() => e));
    }
    forEachTarget(t, e) {
        return this.db.getTargetCache().forEachTarget(t, e);
    }
    xn(t, e) {
        return this.Mn(t, ((t, n) => e(n)));
    }
    addReference(t, e, n) {
        return Br(t, n);
    }
    removeReference(t, e, n) {
        return Br(t, n);
    }
    removeTargets(t, e, n) {
        return this.db.getTargetCache().removeTargets(t, e, n);
    }
    markPotentiallyOrphaned(t, e) {
        return Br(t, e);
    }
    /**
     * Returns true if anything would prevent this document from being garbage
     * collected, given that the document in question is not present in any
     * targets and has a sequence number less than or equal to the upper bound for
     * the collection run.
     */    On(t, e) {
        return function(t, e) {
            let n = !1;
            return Vr(t).zt((s => Rr(t, s, e).next((t => (t && (n = !0), Ti.resolve(!t)))))).next((() => n));
        }(t, e);
    }
    removeOrphanedDocuments(t, e) {
        const n = this.db.getRemoteDocumentCache().newChangeBuffer(), s = [];
        let i = 0;
        return this.Mn(t, ((r, o) => {
            if (o <= e) {
                const e = this.On(t, r).next((e => {
                    if (!e) 
                    // Our size accounting requires us to read all documents before
                    // removing them.
                    return i++, n.getEntry(t, r).next((() => (n.removeEntry(r, ht.min()), xr(t).delete([ 0, Ws(r.path) ]))));
                }));
                s.push(e);
            }
        })).next((() => Ti.waitFor(s))).next((() => n.apply(t))).next((() => i));
    }
    removeTarget(t, e) {
        const n = e.withSequenceNumber(t.currentSequenceNumber);
        return this.db.getTargetCache().updateTargetData(t, n);
    }
    updateLimboDocument(t, e) {
        return Br(t, e);
    }
    /**
     * Call provided function for each document in the cache that is 'orphaned'. Orphaned
     * means not a part of any target, so the only entry in the target-document index for
     * that document will be the sentinel row (targetId 0), which will also have the sequence
     * number for the last time the document was accessed.
     */    Mn(t, e) {
        const n = xr(t);
        let s, i = st.A;
        return n.Wt({
            index: "documentTargetsIndex"
        }, (([t, n], {path: r, sequenceNumber: o}) => {
            0 === t ? (
            // if nextToReport is valid, report it, this is a new key so the
            // last one must not be a member of any targets.
            i !== st.A && e(new kt(Js(s)), i), 
            // set nextToReport to be this sequence number. It's the next one we
            // might report, if we don't find any targets for this document.
            // Note that the sequence number must be defined when the targetId
            // is 0.
            i = o, s = r) : 
            // set nextToReport to be invalid, we know we don't need to report
            // this one since we found a target for it.
            i = st.A;
        })).next((() => {
            // Since we report sequence numbers after getting to the next key, we
            // need to check if the last key we iterated over was an orphaned
            // document and report it.
            i !== st.A && e(new kt(Js(s)), i);
        }));
    }
    getCacheSize(t) {
        return this.db.getRemoteDocumentCache().getSize(t);
    }
}

function Br(t, e) {
    return xr(t).put(
    /**
 * @returns A value suitable for writing a sentinel row in the target-document
 * store.
 */
    function(t, e) {
        return {
            targetId: 0,
            path: Ws(t.path),
            sequenceNumber: e
        };
    }(e, t.currentSequenceNumber));
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An in-memory buffer of entries to be written to a RemoteDocumentCache.
 * It can be used to batch up a set of changes to be written to the cache, but
 * additionally supports reading entries back with the `getEntry()` method,
 * falling back to the underlying RemoteDocumentCache if no entry is
 * buffered.
 *
 * Entries added to the cache *must* be read first. This is to facilitate
 * calculating the size delta of the pending changes.
 *
 * PORTING NOTE: This class was implemented then removed from other platforms.
 * If byte-counting ends up being needed on the other platforms, consider
 * porting this class as part of that implementation work.
 */ class Lr {
    constructor() {
        // A mapping of document key to the new cache entry that should be written.
        this.changes = new Ln((t => t.toString()), ((t, e) => t.isEqual(e))), this.changesApplied = !1;
    }
    /**
     * Buffers a `RemoteDocumentCache.addEntry()` call.
     *
     * You can only modify documents that have already been retrieved via
     * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
     */    addEntry(t) {
        this.assertNotApplied(), this.changes.set(t.key, t);
    }
    /**
     * Buffers a `RemoteDocumentCache.removeEntry()` call.
     *
     * You can only remove documents that have already been retrieved via
     * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
     */    removeEntry(t, e) {
        this.assertNotApplied(), this.changes.set(t, ie.newInvalidDocument(t).setReadTime(e));
    }
    /**
     * Looks up an entry in the cache. The buffered changes will first be checked,
     * and if no buffered change applies, this will forward to
     * `RemoteDocumentCache.getEntry()`.
     *
     * @param transaction - The transaction in which to perform any persistence
     *     operations.
     * @param documentKey - The key of the entry to look up.
     * @returns The cached document or an invalid document if we have nothing
     * cached.
     */    getEntry(t, e) {
        this.assertNotApplied();
        const n = this.changes.get(e);
        return void 0 !== n ? Ti.resolve(n) : this.getFromCache(t, e);
    }
    /**
     * Looks up several entries in the cache, forwarding to
     * `RemoteDocumentCache.getEntry()`.
     *
     * @param transaction - The transaction in which to perform any persistence
     *     operations.
     * @param documentKeys - The keys of the entries to look up.
     * @returns A map of cached documents, indexed by key. If an entry cannot be
     *     found, the corresponding key will be mapped to an invalid document.
     */    getEntries(t, e) {
        return this.getAllFromCache(t, e);
    }
    /**
     * Applies buffered changes to the underlying RemoteDocumentCache, using
     * the provided transaction.
     */    apply(t) {
        return this.assertNotApplied(), this.changesApplied = !0, this.applyChanges(t);
    }
    /** Helper to assert this.changes is not null  */    assertNotApplied() {}
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The RemoteDocumentCache for IndexedDb. To construct, invoke
 * `newIndexedDbRemoteDocumentCache()`.
 */ class Ur {
    constructor(t) {
        this.M = t;
    }
    setIndexManager(t) {
        this.indexManager = t;
    }
    /**
     * Adds the supplied entries to the cache.
     *
     * All calls of `addEntry` are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
     */    addEntry(t, e, n) {
        return Gr(t).put(n);
    }
    /**
     * Removes a document from the cache.
     *
     * All calls of `removeEntry`  are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
     */    removeEntry(t, e, n) {
        return Gr(t).delete(
        /**
 * Returns a key that can be used for document lookups via the primary key of
 * the DbRemoteDocument object store.
 */
        function(t, e) {
            const n = t.path.toArray();
            return [ 
            /* prefix path */ n.slice(0, n.length - 2), 
            /* collection id */ n[n.length - 2], Li(e), 
            /* document id */ n[n.length - 1] ];
        }
        /**
 * Returns a key that can be used for document lookups on the
 * `DbRemoteDocumentDocumentCollectionGroupIndex` index.
 */ (e, n));
    }
    /**
     * Updates the current cache size.
     *
     * Callers to `addEntry()` and `removeEntry()` *must* call this afterwards to update the
     * cache's metadata.
     */    updateMetadata(t, e) {
        return this.getMetadata(t).next((n => (n.byteSize += e, this.Fn(t, n))));
    }
    getEntry(t, e) {
        let n = ie.newInvalidDocument(e);
        return Gr(t).Wt({
            index: "documentKeyIndex",
            range: IDBKeyRange.only(Qr(e))
        }, ((t, s) => {
            n = this.$n(e, s);
        })).next((() => n));
    }
    /**
     * Looks up an entry in the cache.
     *
     * @param documentKey - The key of the entry to look up.
     * @returns The cached document entry and its size.
     */    Bn(t, e) {
        let n = {
            size: 0,
            document: ie.newInvalidDocument(e)
        };
        return Gr(t).Wt({
            index: "documentKeyIndex",
            range: IDBKeyRange.only(Qr(e))
        }, ((t, s) => {
            n = {
                document: this.$n(e, s),
                size: Er(s)
            };
        })).next((() => n));
    }
    getEntries(t, e) {
        let n = zn();
        return this.Ln(t, e, ((t, e) => {
            const s = this.$n(t, e);
            n = n.insert(t, s);
        })).next((() => n));
    }
    /**
     * Looks up several entries in the cache.
     *
     * @param documentKeys - The set of keys entries to look up.
     * @returns A map of documents indexed by key and a map of sizes indexed by
     *     key (zero if the document does not exist).
     */    Un(t, e) {
        let n = zn(), s = new Un(kt.comparator);
        return this.Ln(t, e, ((t, e) => {
            const i = this.$n(t, e);
            n = n.insert(t, i), s = s.insert(t, Er(e));
        })).next((() => ({
            documents: n,
            qn: s
        })));
    }
    Ln(t, e, n) {
        if (e.isEmpty()) return Ti.resolve();
        let s = new Gn(Wr);
        e.forEach((t => s = s.add(t)));
        const i = IDBKeyRange.bound(Qr(s.first()), Qr(s.last())), r = s.getIterator();
        let o = r.getNext();
        return Gr(t).Wt({
            index: "documentKeyIndex",
            range: i
        }, ((t, e, s) => {
            const i = kt.fromSegments([ ...e.prefixPath, e.collectionGroup, e.documentId ]);
            // Go through keys not found in cache.
                        for (;o && Wr(o, i) < 0; ) n(o, null), o = r.getNext();
            o && o.isEqual(i) && (
            // Key found in cache.
            n(o, e), o = r.hasNext() ? r.getNext() : null), 
            // Skip to the next key (if there is one).
            o ? s.Ut(Qr(o)) : s.done();
        })).next((() => {
            // The rest of the keys are not in the cache. One case where `iterate`
            // above won't go through them is when the cache is empty.
            for (;o; ) n(o, null), o = r.hasNext() ? r.getNext() : null;
        }));
    }
    getAllFromCollection(t, e, n) {
        const s = [ e.popLast().toArray(), e.lastSegment(), Li(n.readTime), n.documentKey.path.isEmpty() ? "" : n.documentKey.path.lastSegment() ], i = [ e.popLast().toArray(), e.lastSegment(), [ Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER ], "" ];
        return Gr(t).qt(IDBKeyRange.bound(s, i, !0)).next((t => {
            let e = zn();
            for (const n of t) {
                const t = this.$n(kt.fromSegments(n.prefixPath.concat(n.collectionGroup, n.documentId)), n);
                e = e.insert(t.key, t);
            }
            return e;
        }));
    }
    getAllFromCollectionGroup(t, e, n, s) {
        let i = zn();
        const r = jr(e, n), o = jr(e, fe.max());
        return Gr(t).Wt({
            index: "collectionGroupIndex",
            range: IDBKeyRange.bound(r, o, !0)
        }, ((t, e, n) => {
            const r = this.$n(kt.fromSegments(e.prefixPath.concat(e.collectionGroup, e.documentId)), e);
            i = i.insert(r.key, r), i.size === s && n.done();
        })).next((() => i));
    }
    newChangeBuffer(t) {
        return new qr(this, !!t && t.trackRemovals);
    }
    getSize(t) {
        return this.getMetadata(t).next((t => t.byteSize));
    }
    getMetadata(t) {
        return Kr(t).get("remoteDocumentGlobalKey").next((t => (q(!!t), t)));
    }
    Fn(t, e) {
        return Kr(t).put("remoteDocumentGlobalKey", e);
    }
    /**
     * Decodes `dbRemoteDoc` and returns the document (or an invalid document if
     * the document corresponds to the format used for sentinel deletes).
     */    $n(t, e) {
        if (e) {
            const t = $i(this.M, e);
            // Whether the document is a sentinel removal and should only be used in the
            // `getNewDocumentChanges()`
                        if (!(t.isNoDocument() && t.version.isEqual(ht.min()))) return t;
        }
        return ie.newInvalidDocument(t);
    }
}

/** Creates a new IndexedDbRemoteDocumentCache. */
/**
 * Handles the details of adding and updating documents in the IndexedDbRemoteDocumentCache.
 *
 * Unlike the MemoryRemoteDocumentChangeBuffer, the IndexedDb implementation computes the size
 * delta for all submitted changes. This avoids having to re-read all documents from IndexedDb
 * when we apply the changes.
 */
class qr extends Lr {
    /**
     * @param documentCache - The IndexedDbRemoteDocumentCache to apply the changes to.
     * @param trackRemovals - Whether to create sentinel deletes that can be tracked by
     * `getNewDocumentChanges()`.
     */
    constructor(t, e) {
        super(), this.Kn = t, this.trackRemovals = e, 
        // A map of document sizes and read times prior to applying the changes in
        // this buffer.
        this.Gn = new Ln((t => t.toString()), ((t, e) => t.isEqual(e)));
    }
    applyChanges(t) {
        const e = [];
        let n = 0, s = new Gn(((t, e) => ot(t.canonicalString(), e.canonicalString())));
        return this.changes.forEach(((i, r) => {
            const o = this.Gn.get(i);
            if (e.push(this.Kn.removeEntry(t, i, o.readTime)), r.isValidDocument()) {
                const u = Bi(this.Kn.M, r);
                s = s.add(i.path.popLast());
                const a = Er(u);
                n += a - o.size, e.push(this.Kn.addEntry(t, i, u));
            } else if (n -= o.size, this.trackRemovals) {
                // In order to track removals, we store a "sentinel delete" in the
                // RemoteDocumentCache. This entry is represented by a NoDocument
                // with a version of 0 and ignored by `maybeDecodeDocument()` but
                // preserved in `getNewDocumentChanges()`.
                const n = Bi(this.Kn.M, r.convertToNoDocument(ht.min()));
                e.push(this.Kn.addEntry(t, i, n));
            }
        })), s.forEach((n => {
            e.push(this.Kn.indexManager.addToCollectionParentIndex(t, n));
        })), e.push(this.Kn.updateMetadata(t, n)), Ti.waitFor(e);
    }
    getFromCache(t, e) {
        // Record the size of everything we load from the cache so we can compute a delta later.
        return this.Kn.Bn(t, e).next((t => (this.Gn.set(e, {
            size: t.size,
            readTime: t.document.readTime
        }), t.document)));
    }
    getAllFromCache(t, e) {
        // Record the size of everything we load from the cache so we can compute
        // a delta later.
        return this.Kn.Un(t, e).next((({documents: t, qn: e}) => (
        // Note: `getAllFromCache` returns two maps instead of a single map from
        // keys to `DocumentSizeEntry`s. This is to allow returning the
        // `MutableDocumentMap` directly, without a conversion.
        e.forEach(((e, n) => {
            this.Gn.set(e, {
                size: n,
                readTime: t.get(e).readTime
            });
        })), t)));
    }
}

function Kr(t) {
    return xi(t, "remoteDocumentGlobal");
}

/**
 * Helper to get a typed SimpleDbStore for the remoteDocuments object store.
 */ function Gr(t) {
    return xi(t, "remoteDocumentsV14");
}

/**
 * Returns a key that can be used for document lookups on the
 * `DbRemoteDocumentDocumentKeyIndex` index.
 */ function Qr(t) {
    const e = t.path.toArray();
    return [ 
    /* prefix path */ e.slice(0, e.length - 2), 
    /* collection id */ e[e.length - 2], 
    /* document id */ e[e.length - 1] ];
}

function jr(t, e) {
    const n = e.documentKey.path.toArray();
    return [ 
    /* collection id */ t, Li(e.readTime), 
    /* prefix path */ n.slice(0, n.length - 2), 
    /* document id */ n.length > 0 ? n[n.length - 1] : "" ];
}

/**
 * Comparator that compares document keys according to the primary key sorting
 * used by the `DbRemoteDocumentDocument` store (by prefix path, collection id
 * and then document ID).
 *
 * Visible for testing.
 */ function Wr(t, e) {
    const n = t.path.toArray(), s = e.path.toArray();
    // The ordering is based on https://chromium.googlesource.com/chromium/blink/+/fe5c21fef94dae71c1c3344775b8d8a7f7e6d9ec/Source/modules/indexeddb/IDBKey.cpp#74
    let i = 0;
    for (let t = 0; t < n.length - 2 && t < s.length - 2; ++t) if (i = ot(n[t], s[t]), 
    i) return i;
    return i = ot(n.length, s.length), i || (i = ot(n[n.length - 2], s[s.length - 2]), 
    i || ot(n[n.length - 1], s[s.length - 1]));
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// TODO(indexing): Remove this constant
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Performs database creation and schema upgrades. */
class zr {
    constructor(t) {
        this.M = t;
    }
    /**
     * Performs database creation and schema upgrades.
     *
     * Note that in production, this method is only ever used to upgrade the schema
     * to SCHEMA_VERSION. Different values of toVersion are only used for testing
     * and local feature development.
     */    kt(t, e, n, s) {
        const i = new Ei("createOrUpgrade", e);
        n < 1 && s >= 1 && (function(t) {
            t.createObjectStore("owner");
        }(t), function(t) {
            t.createObjectStore("mutationQueues", {
                keyPath: "userId"
            });
            t.createObjectStore("mutations", {
                keyPath: "batchId",
                autoIncrement: !0
            }).createIndex("userMutationsIndex", Ys, {
                unique: !0
            }), t.createObjectStore("documentMutations");
        }
        /**
 * Upgrade function to migrate the 'mutations' store from V1 to V3. Loads
 * and rewrites all data.
 */ (t), Hr(t), function(t) {
            t.createObjectStore("remoteDocuments");
        }(t));
        // Migration 2 to populate the targetGlobal object no longer needed since
        // migration 3 unconditionally clears it.
                let r = Ti.resolve();
        return n < 3 && s >= 3 && (
        // Brand new clients don't need to drop and recreate--only clients that
        // potentially have corrupt data.
        0 !== n && (!function(t) {
            t.deleteObjectStore("targetDocuments"), t.deleteObjectStore("targets"), t.deleteObjectStore("targetGlobal");
        }(t), Hr(t)), r = r.next((() => 
        /**
 * Creates the target global singleton row.
 *
 * @param txn - The version upgrade transaction for indexeddb
 */
        function(t) {
            const e = t.store("targetGlobal"), n = {
                highestTargetId: 0,
                highestListenSequenceNumber: 0,
                lastRemoteSnapshotVersion: ht.min().toTimestamp(),
                targetCount: 0
            };
            return e.put("targetGlobalKey", n);
        }(i)))), n < 4 && s >= 4 && (0 !== n && (
        // Schema version 3 uses auto-generated keys to generate globally unique
        // mutation batch IDs (this was previously ensured internally by the
        // client). To migrate to the new schema, we have to read all mutations
        // and write them back out. We preserve the existing batch IDs to guarantee
        // consistency with other object stores. Any further mutation batch IDs will
        // be auto-generated.
        r = r.next((() => function(t, e) {
            return e.store("mutations").qt().next((n => {
                t.deleteObjectStore("mutations");
                t.createObjectStore("mutations", {
                    keyPath: "batchId",
                    autoIncrement: !0
                }).createIndex("userMutationsIndex", Ys, {
                    unique: !0
                });
                const s = e.store("mutations"), i = n.map((t => s.put(t)));
                return Ti.waitFor(i);
            }));
        }(t, i)))), r = r.next((() => {
            !function(t) {
                t.createObjectStore("clientMetadata", {
                    keyPath: "clientId"
                });
            }(t);
        }))), n < 5 && s >= 5 && (r = r.next((() => this.Qn(i)))), n < 6 && s >= 6 && (r = r.next((() => (function(t) {
            t.createObjectStore("remoteDocumentGlobal");
        }(t), this.jn(i))))), n < 7 && s >= 7 && (r = r.next((() => this.Wn(i)))), n < 8 && s >= 8 && (r = r.next((() => this.zn(t, i)))), 
        n < 9 && s >= 9 && (r = r.next((() => {
            // Multi-Tab used to manage its own changelog, but this has been moved
            // to the DbRemoteDocument object store itself. Since the previous change
            // log only contained transient data, we can drop its object store.
            !function(t) {
                t.objectStoreNames.contains("remoteDocumentChanges") && t.deleteObjectStore("remoteDocumentChanges");
            }(t);
            // Note: Schema version 9 used to create a read time index for the
            // RemoteDocumentCache. This is now done with schema version 13.
                }))), n < 10 && s >= 10 && (r = r.next((() => this.Hn(i)))), n < 11 && s >= 11 && (r = r.next((() => {
            !function(t) {
                t.createObjectStore("bundles", {
                    keyPath: "bundleId"
                });
            }(t), function(t) {
                t.createObjectStore("namedQueries", {
                    keyPath: "name"
                });
            }(t);
        }))), n < 12 && s >= 12 && (r = r.next((() => {
            !function(t) {
                const e = t.createObjectStore("documentOverlays", {
                    keyPath: fi
                });
                e.createIndex("collectionPathOverlayIndex", di, {
                    unique: !1
                }), e.createIndex("collectionGroupOverlayIndex", _i, {
                    unique: !1
                });
            }(t);
        }))), n < 13 && s >= 13 && (r = r.next((() => function(t) {
            const e = t.createObjectStore("remoteDocumentsV14", {
                keyPath: ei
            });
            e.createIndex("documentKeyIndex", ni), e.createIndex("collectionGroupIndex", si);
        }(t))).next((() => this.Jn(t, i))).next((() => t.deleteObjectStore("remoteDocuments")))), 
        n < 14 && s >= 14 && (r = r.next((() => {
            !function(t) {
                t.createObjectStore("indexConfiguration", {
                    keyPath: "indexId",
                    autoIncrement: !0
                }).createIndex("collectionGroupIndex", "collectionGroup", {
                    unique: !1
                });
                t.createObjectStore("indexState", {
                    keyPath: ai
                }).createIndex("sequenceNumberIndex", ci, {
                    unique: !1
                });
                t.createObjectStore("indexEntries", {
                    keyPath: hi
                }).createIndex("documentKeyIndex", li, {
                    unique: !1
                });
            }(t);
        }))), r;
    }
    jn(t) {
        let e = 0;
        return t.store("remoteDocuments").Wt(((t, n) => {
            e += Er(n);
        })).next((() => {
            const n = {
                byteSize: e
            };
            return t.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey", n);
        }));
    }
    Qn(t) {
        const e = t.store("mutationQueues"), n = t.store("mutations");
        return e.qt().next((e => Ti.forEach(e, (e => {
            const s = IDBKeyRange.bound([ e.userId, -1 ], [ e.userId, e.lastAcknowledgedBatchId ]);
            return n.qt("userMutationsIndex", s).next((n => Ti.forEach(n, (n => {
                q(n.userId === e.userId);
                const s = Ki(this.M, n);
                return Tr(t, e.userId, s).next((() => {}));
            }))));
        }))));
    }
    /**
     * Ensures that every document in the remote document cache has a corresponding sentinel row
     * with a sequence number. Missing rows are given the most recently used sequence number.
     */    Wn(t) {
        const e = t.store("targetDocuments"), n = t.store("remoteDocuments");
        return t.store("targetGlobal").get("targetGlobalKey").next((t => {
            const s = [];
            return n.Wt(((n, i) => {
                const r = new wt(n), o = function(t) {
                    return [ 0, Ws(t) ];
                }(r);
                s.push(e.get(o).next((n => n ? Ti.resolve() : (n => e.put({
                    targetId: 0,
                    path: Ws(n),
                    sequenceNumber: t.highestListenSequenceNumber
                }))(r))));
            })).next((() => Ti.waitFor(s)));
        }));
    }
    zn(t, e) {
        // Create the index.
        t.createObjectStore("collectionParents", {
            keyPath: ui
        });
        const n = e.store("collectionParents"), s = new fr, i = t => {
            if (s.add(t)) {
                const e = t.lastSegment(), s = t.popLast();
                return n.put({
                    collectionId: e,
                    parent: Ws(s)
                });
            }
        };
        // Helper to add an index entry iff we haven't already written it.
                // Index existing remote documents.
        return e.store("remoteDocuments").Wt({
            jt: !0
        }, ((t, e) => {
            const n = new wt(t);
            return i(n.popLast());
        })).next((() => e.store("documentMutations").Wt({
            jt: !0
        }, (([t, e, n], s) => {
            const r = Js(e);
            return i(r.popLast());
        }))));
    }
    Hn(t) {
        const e = t.store("targets");
        return e.Wt(((t, n) => {
            const s = Gi(n), i = Qi(this.M, s);
            return e.put(i);
        }));
    }
    Jn(t, e) {
        const n = e.store("remoteDocuments"), s = [];
        return n.Wt(((t, n) => {
            const i = e.store("remoteDocumentsV14"), r = (o = n, o.document ? new kt(wt.fromString(o.document.name).popFirst(5)) : o.noDocument ? kt.fromSegments(o.noDocument.path) : o.unknownDocument ? kt.fromSegments(o.unknownDocument.path) : U()).path.toArray();
            var o;
            /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */            const u = {
                prefixPath: r.slice(0, r.length - 2),
                collectionGroup: r[r.length - 2],
                documentId: r[r.length - 1],
                readTime: n.readTime || [ 0, 0 ],
                unknownDocument: n.unknownDocument,
                noDocument: n.noDocument,
                document: n.document,
                hasCommittedMutations: !!n.hasCommittedMutations
            };
            s.push(i.put(u));
        })).next((() => Ti.waitFor(s)));
    }
}

function Hr(t) {
    t.createObjectStore("targetDocuments", {
        keyPath: ri
    }).createIndex("documentTargetsIndex", oi, {
        unique: !0
    });
    // NOTE: This is unique only because the TargetId is the suffix.
    t.createObjectStore("targets", {
        keyPath: "targetId"
    }).createIndex("queryTargetsIndex", ii, {
        unique: !0
    }), t.createObjectStore("targetGlobal");
}

const Jr = "Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";

/**
 * Oldest acceptable age in milliseconds for client metadata before the client
 * is considered inactive and its associated data is garbage collected.
 */
/**
 * An IndexedDB-backed instance of Persistence. Data is stored persistently
 * across sessions.
 *
 * On Web only, the Firestore SDKs support shared access to its persistence
 * layer. This allows multiple browser tabs to read and write to IndexedDb and
 * to synchronize state even without network connectivity. Shared access is
 * currently optional and not enabled unless all clients invoke
 * `enablePersistence()` with `{synchronizeTabs:true}`.
 *
 * In multi-tab mode, if multiple clients are active at the same time, the SDK
 * will designate one client as the “primary client”. An effort is made to pick
 * a visible, network-connected and active client, and this client is
 * responsible for letting other clients know about its presence. The primary
 * client writes a unique client-generated identifier (the client ID) to
 * IndexedDb’s “owner” store every 4 seconds. If the primary client fails to
 * update this entry, another client can acquire the lease and take over as
 * primary.
 *
 * Some persistence operations in the SDK are designated as primary-client only
 * operations. This includes the acknowledgment of mutations and all updates of
 * remote documents. The effects of these operations are written to persistence
 * and then broadcast to other tabs via LocalStorage (see
 * `WebStorageSharedClientState`), which then refresh their state from
 * persistence.
 *
 * Similarly, the primary client listens to notifications sent by secondary
 * clients to discover persistence changes written by secondary clients, such as
 * the addition of new mutations and query targets.
 *
 * If multi-tab is not enabled and another tab already obtained the primary
 * lease, IndexedDbPersistence enters a failed state and all subsequent
 * operations will automatically fail.
 *
 * Additionally, there is an optimization so that when a tab is closed, the
 * primary lease is released immediately (this is especially important to make
 * sure that a refreshed tab is able to immediately re-acquire the primary
 * lease). Unfortunately, IndexedDB cannot be reliably used in window.unload
 * since it is an asynchronous API. So in addition to attempting to give up the
 * lease, the leaseholder writes its client ID to a "zombiedClient" entry in
 * LocalStorage which acts as an indicator that another tab should go ahead and
 * take the primary lease immediately regardless of the current lease timestamp.
 *
 * TODO(b/114226234): Remove `synchronizeTabs` section when multi-tab is no
 * longer optional.
 */
class Yr {
    constructor(
    /**
     * Whether to synchronize the in-memory state of multiple tabs and share
     * access to local persistence.
     */
    t, e, n, s, i, r, o, u, a, 
    /**
     * If set to true, forcefully obtains database access. Existing tabs will
     * no longer be able to access IndexedDB.
     */
    c, h = 13) {
        if (this.allowTabSynchronization = t, this.persistenceKey = e, this.clientId = n, 
        this.Yn = i, this.window = r, this.document = o, this.Xn = a, this.Zn = c, this.ts = h, 
        this.es = null, this.ns = !1, this.isPrimary = !1, this.networkEnabled = !0, 
        /** Our window.unload handler, if registered. */
        this.ss = null, this.inForeground = !1, 
        /** Our 'visibilitychange' listener if registered. */
        this.rs = null, 
        /** The client metadata refresh task. */
        this.os = null, 
        /** The last time we garbage collected the client metadata object store. */
        this.us = Number.NEGATIVE_INFINITY, 
        /** A listener to notify on primary state changes. */
        this.cs = t => Promise.resolve(), !Yr.vt()) throw new j(Q.UNIMPLEMENTED, "This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");
        this.referenceDelegate = new $r(this, s), this.hs = e + "main", this.M = new Fi(u), 
        this.ls = new Ai(this.hs, this.ts, new zr(this.M)), this.fs = new Sr(this.referenceDelegate, this.M), 
        this.ds = function(t) {
            return new Ur(t);
        }(this.M), this._s = new Hi, this.window && this.window.localStorage ? this.ws = this.window.localStorage : (this.ws = null, 
        !1 === c && $("IndexedDbPersistence", "LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."));
    }
    /**
     * Attempt to start IndexedDb persistence.
     *
     * @returns Whether persistence was enabled.
     */    start() {
        // NOTE: This is expected to fail sometimes (in the case of another tab
        // already having the persistence lock), so it's the first thing we should
        // do.
        return this.gs().then((() => {
            if (!this.isPrimary && !this.allowTabSynchronization) 
            // Fail `start()` if `synchronizeTabs` is disabled and we cannot
            // obtain the primary lease.
            throw new j(Q.FAILED_PRECONDITION, Jr);
            return this.ys(), this.ps(), this.Is(), this.runTransaction("getHighestListenSequenceNumber", "readonly", (t => this.fs.getHighestSequenceNumber(t)));
        })).then((t => {
            this.es = new st(t, this.Xn);
        })).then((() => {
            this.ns = !0;
        })).catch((t => (this.ls && this.ls.close(), Promise.reject(t))));
    }
    /**
     * Registers a listener that gets called when the primary state of the
     * instance changes. Upon registering, this listener is invoked immediately
     * with the current primary state.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */    Ts(t) {
        return this.cs = async e => {
            if (this.started) return t(e);
        }, t(this.isPrimary);
    }
    /**
     * Registers a listener that gets called when the database receives a
     * version change event indicating that it has deleted.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */    setDatabaseDeletedListener(t) {
        this.ls.Ot((async e => {
            // Check if an attempt is made to delete IndexedDB.
            null === e.newVersion && await t();
        }));
    }
    /**
     * Adjusts the current network state in the client's metadata, potentially
     * affecting the primary lease.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */    setNetworkEnabled(t) {
        this.networkEnabled !== t && (this.networkEnabled = t, 
        // Schedule a primary lease refresh for immediate execution. The eventual
        // lease update will be propagated via `primaryStateListener`.
        this.Yn.enqueueAndForget((async () => {
            this.started && await this.gs();
        })));
    }
    /**
     * Updates the client metadata in IndexedDb and attempts to either obtain or
     * extend the primary lease for the local client. Asynchronously notifies the
     * primary state listener if the client either newly obtained or released its
     * primary lease.
     */    gs() {
        return this.runTransaction("updateClientMetadataAndTryBecomePrimary", "readwrite", (t => Zr(t).put({
            clientId: this.clientId,
            updateTimeMs: Date.now(),
            networkEnabled: this.networkEnabled,
            inForeground: this.inForeground
        }).next((() => {
            if (this.isPrimary) return this.Es(t).next((t => {
                t || (this.isPrimary = !1, this.Yn.enqueueRetryable((() => this.cs(!1))));
            }));
        })).next((() => this.As(t))).next((e => this.isPrimary && !e ? this.Rs(t).next((() => !1)) : !!e && this.Ps(t).next((() => !0)))))).catch((t => {
            if (bi(t)) 
            // Proceed with the existing state. Any subsequent access to
            // IndexedDB will verify the lease.
            return F("IndexedDbPersistence", "Failed to extend owner lease: ", t), this.isPrimary;
            if (!this.allowTabSynchronization) throw t;
            return F("IndexedDbPersistence", "Releasing owner lease after error during lease refresh", t), 
            /* isPrimary= */ !1;
        })).then((t => {
            this.isPrimary !== t && this.Yn.enqueueRetryable((() => this.cs(t))), this.isPrimary = t;
        }));
    }
    Es(t) {
        return Xr(t).get("owner").next((t => Ti.resolve(this.bs(t))));
    }
    Vs(t) {
        return Zr(t).delete(this.clientId);
    }
    /**
     * If the garbage collection threshold has passed, prunes the
     * RemoteDocumentChanges and the ClientMetadata store based on the last update
     * time of all clients.
     */    async vs() {
        if (this.isPrimary && !this.Ss(this.us, 18e5)) {
            this.us = Date.now();
            const t = await this.runTransaction("maybeGarbageCollectMultiClientState", "readwrite-primary", (t => {
                const e = xi(t, "clientMetadata");
                return e.qt().next((t => {
                    const n = this.Ds(t, 18e5), s = t.filter((t => -1 === n.indexOf(t)));
                    // Delete metadata for clients that are no longer considered active.
                    return Ti.forEach(s, (t => e.delete(t.clientId))).next((() => s));
                }));
            })).catch((() => []));
            // Delete potential leftover entries that may continue to mark the
            // inactive clients as zombied in LocalStorage.
            // Ideally we'd delete the IndexedDb and LocalStorage zombie entries for
            // the client atomically, but we can't. So we opt to delete the IndexedDb
            // entries first to avoid potentially reviving a zombied client.
                        if (this.ws) for (const e of t) this.ws.removeItem(this.Cs(e.clientId));
        }
    }
    /**
     * Schedules a recurring timer to update the client metadata and to either
     * extend or acquire the primary lease if the client is eligible.
     */    Is() {
        this.os = this.Yn.enqueueAfterDelay("client_metadata_refresh" /* ClientMetadataRefresh */ , 4e3, (() => this.gs().then((() => this.vs())).then((() => this.Is()))));
    }
    /** Checks whether `client` is the local client. */    bs(t) {
        return !!t && t.ownerId === this.clientId;
    }
    /**
     * Evaluate the state of all active clients and determine whether the local
     * client is or can act as the holder of the primary lease. Returns whether
     * the client is eligible for the lease, but does not actually acquire it.
     * May return 'false' even if there is no active leaseholder and another
     * (foreground) client should become leaseholder instead.
     */    As(t) {
        if (this.Zn) return Ti.resolve(!0);
        return Xr(t).get("owner").next((e => {
            // A client is eligible for the primary lease if:
            // - its network is enabled and the client's tab is in the foreground.
            // - its network is enabled and no other client's tab is in the
            //   foreground.
            // - every clients network is disabled and the client's tab is in the
            //   foreground.
            // - every clients network is disabled and no other client's tab is in
            //   the foreground.
            // - the `forceOwningTab` setting was passed in.
            if (null !== e && this.Ss(e.leaseTimestampMs, 5e3) && !this.xs(e.ownerId)) {
                if (this.bs(e) && this.networkEnabled) return !0;
                if (!this.bs(e)) {
                    if (!e.allowTabSynchronization) 
                    // Fail the `canActAsPrimary` check if the current leaseholder has
                    // not opted into multi-tab synchronization. If this happens at
                    // client startup, we reject the Promise returned by
                    // `enablePersistence()` and the user can continue to use Firestore
                    // with in-memory persistence.
                    // If this fails during a lease refresh, we will instead block the
                    // AsyncQueue from executing further operations. Note that this is
                    // acceptable since mixing & matching different `synchronizeTabs`
                    // settings is not supported.
                    // TODO(b/114226234): Remove this check when `synchronizeTabs` can
                    // no longer be turned off.
                    throw new j(Q.FAILED_PRECONDITION, Jr);
                    return !1;
                }
            }
            return !(!this.networkEnabled || !this.inForeground) || Zr(t).qt().next((t => void 0 === this.Ds(t, 5e3).find((t => {
                if (this.clientId !== t.clientId) {
                    const e = !this.networkEnabled && t.networkEnabled, n = !this.inForeground && t.inForeground, s = this.networkEnabled === t.networkEnabled;
                    if (e || n && s) return !0;
                }
                return !1;
            }))));
        })).next((t => (this.isPrimary !== t && F("IndexedDbPersistence", `Client ${t ? "is" : "is not"} eligible for a primary lease.`), 
        t)));
    }
    async shutdown() {
        // The shutdown() operations are idempotent and can be called even when
        // start() aborted (e.g. because it couldn't acquire the persistence lease).
        this.ns = !1, this.Ns(), this.os && (this.os.cancel(), this.os = null), this.ks(), 
        this.Ms(), 
        // Use `SimpleDb.runTransaction` directly to avoid failing if another tab
        // has obtained the primary lease.
        await this.ls.runTransaction("shutdown", "readwrite", [ "owner", "clientMetadata" ], (t => {
            const e = new Ci(t, st.A);
            return this.Rs(e).next((() => this.Vs(e)));
        })), this.ls.close(), 
        // Remove the entry marking the client as zombied from LocalStorage since
        // we successfully deleted its metadata from IndexedDb.
        this.Os();
    }
    /**
     * Returns clients that are not zombied and have an updateTime within the
     * provided threshold.
     */    Ds(t, e) {
        return t.filter((t => this.Ss(t.updateTimeMs, e) && !this.xs(t.clientId)));
    }
    /**
     * Returns the IDs of the clients that are currently active. If multi-tab
     * is not supported, returns an array that only contains the local client's
     * ID.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */    Fs() {
        return this.runTransaction("getActiveClients", "readonly", (t => Zr(t).qt().next((t => this.Ds(t, 18e5).map((t => t.clientId))))));
    }
    get started() {
        return this.ns;
    }
    getMutationQueue(t, e) {
        return Ar.Yt(t, this.M, e, this.referenceDelegate);
    }
    getTargetCache() {
        return this.fs;
    }
    getRemoteDocumentCache() {
        return this.ds;
    }
    getIndexManager(t) {
        return new _r(t, this.M.Jt.databaseId);
    }
    getDocumentOverlayCache(t) {
        return Xi.Yt(this.M, t);
    }
    getBundleCache() {
        return this._s;
    }
    runTransaction(t, e, n) {
        F("IndexedDbPersistence", "Starting transaction:", t);
        const s = "readonly" === e ? "readonly" : "readwrite", i = 14 === (r = this.ts) ? yi : 13 === r ? gi : 12 === r ? mi : 11 === r ? wi : void U();
        /** Returns the object stores for the provided schema. */
        var r;
        let o;
        // Do all transactions as readwrite against all object stores, since we
        // are the only reader/writer.
                return this.ls.runTransaction(t, s, i, (s => (o = new Ci(s, this.es ? this.es.next() : st.A), 
        "readwrite-primary" === e ? this.Es(o).next((t => !!t || this.As(o))).next((e => {
            if (!e) throw $(`Failed to obtain primary lease for action '${t}'.`), this.isPrimary = !1, 
            this.Yn.enqueueRetryable((() => this.cs(!1))), new j(Q.FAILED_PRECONDITION, pi);
            return n(o);
        })).next((t => this.Ps(o).next((() => t)))) : this.$s(o).next((() => n(o)))))).then((t => (o.raiseOnCommittedEvent(), 
        t)));
    }
    /**
     * Verifies that the current tab is the primary leaseholder or alternatively
     * that the leaseholder has opted into multi-tab synchronization.
     */
    // TODO(b/114226234): Remove this check when `synchronizeTabs` can no longer
    // be turned off.
    $s(t) {
        return Xr(t).get("owner").next((t => {
            if (null !== t && this.Ss(t.leaseTimestampMs, 5e3) && !this.xs(t.ownerId) && !this.bs(t) && !(this.Zn || this.allowTabSynchronization && t.allowTabSynchronization)) throw new j(Q.FAILED_PRECONDITION, Jr);
        }));
    }
    /**
     * Obtains or extends the new primary lease for the local client. This
     * method does not verify that the client is eligible for this lease.
     */    Ps(t) {
        const e = {
            ownerId: this.clientId,
            allowTabSynchronization: this.allowTabSynchronization,
            leaseTimestampMs: Date.now()
        };
        return Xr(t).put("owner", e);
    }
    static vt() {
        return Ai.vt();
    }
    /** Checks the primary lease and removes it if we are the current primary. */    Rs(t) {
        const e = Xr(t);
        return e.get("owner").next((t => this.bs(t) ? (F("IndexedDbPersistence", "Releasing primary lease."), 
        e.delete("owner")) : Ti.resolve()));
    }
    /** Verifies that `updateTimeMs` is within `maxAgeMs`. */    Ss(t, e) {
        const n = Date.now();
        return !(t < n - e) && (!(t > n) || ($(`Detected an update time that is in the future: ${t} > ${n}`), 
        !1));
    }
    ys() {
        null !== this.document && "function" == typeof this.document.addEventListener && (this.rs = () => {
            this.Yn.enqueueAndForget((() => (this.inForeground = "visible" === this.document.visibilityState, 
            this.gs())));
        }, this.document.addEventListener("visibilitychange", this.rs), this.inForeground = "visible" === this.document.visibilityState);
    }
    ks() {
        this.rs && (this.document.removeEventListener("visibilitychange", this.rs), this.rs = null);
    }
    /**
     * Attaches a window.unload handler that will synchronously write our
     * clientId to a "zombie client id" location in LocalStorage. This can be used
     * by tabs trying to acquire the primary lease to determine that the lease
     * is no longer valid even if the timestamp is recent. This is particularly
     * important for the refresh case (so the tab correctly re-acquires the
     * primary lease). LocalStorage is used for this rather than IndexedDb because
     * it is a synchronous API and so can be used reliably from  an unload
     * handler.
     */    ps() {
        var t;
        "function" == typeof (null === (t = this.window) || void 0 === t ? void 0 : t.addEventListener) && (this.ss = () => {
            // Note: In theory, this should be scheduled on the AsyncQueue since it
            // accesses internal state. We execute this code directly during shutdown
            // to make sure it gets a chance to run.
            this.Ns(), f() && navigator.appVersion.match(/Version\/1[45]/) && 
            // On Safari 14 and 15, we do not run any cleanup actions as it might
            // trigger a bug that prevents Safari from re-opening IndexedDB during
            // the next page load.
            // See https://bugs.webkit.org/show_bug.cgi?id=226547
            this.Yn.enterRestrictedMode(/* purgeExistingTasks= */ !0), this.Yn.enqueueAndForget((() => this.shutdown()));
        }, this.window.addEventListener("pagehide", this.ss));
    }
    Ms() {
        this.ss && (this.window.removeEventListener("pagehide", this.ss), this.ss = null);
    }
    /**
     * Returns whether a client is "zombied" based on its LocalStorage entry.
     * Clients become zombied when their tab closes without running all of the
     * cleanup logic in `shutdown()`.
     */    xs(t) {
        var e;
        try {
            const n = null !== (null === (e = this.ws) || void 0 === e ? void 0 : e.getItem(this.Cs(t)));
            return F("IndexedDbPersistence", `Client '${t}' ${n ? "is" : "is not"} zombied in LocalStorage`), 
            n;
        } catch (t) {
            // Gracefully handle if LocalStorage isn't working.
            return $("IndexedDbPersistence", "Failed to get zombied client id.", t), !1;
        }
    }
    /**
     * Record client as zombied (a client that had its tab closed). Zombied
     * clients are ignored during primary tab selection.
     */    Ns() {
        if (this.ws) try {
            this.ws.setItem(this.Cs(this.clientId), String(Date.now()));
        } catch (t) {
            // Gracefully handle if LocalStorage isn't available / working.
            $("Failed to set zombie client id.", t);
        }
    }
    /** Removes the zombied client entry if it exists. */    Os() {
        if (this.ws) try {
            this.ws.removeItem(this.Cs(this.clientId));
        } catch (t) {
            // Ignore
        }
    }
    Cs(t) {
        return `firestore_zombie_${this.persistenceKey}_${t}`;
    }
}

/**
 * Helper to get a typed SimpleDbStore for the primary client object store.
 */ function Xr(t) {
    return xi(t, "owner");
}

/**
 * Helper to get a typed SimpleDbStore for the client metadata object store.
 */ function Zr(t) {
    return xi(t, "clientMetadata");
}

/**
 * Generates a string used as a prefix when storing data in IndexedDB and
 * LocalStorage.
 */ function to(t, e) {
    // Use two different prefix formats:
    //   * firestore / persistenceKey / projectID . databaseID / ...
    //   * firestore / persistenceKey / projectID / ...
    // projectIDs are DNS-compatible names and cannot contain dots
    // so there's no danger of collisions.
    let n = t.projectId;
    return t.isDefaultDatabase || (n += "." + t.database), "firestore/" + e + "/" + n + "/";
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A readonly view of the local state of all documents we're tracking (i.e. we
 * have a cached version in remoteDocumentCache or local mutations for the
 * document). The view is computed by applying the mutations in the
 * MutationQueue to the RemoteDocumentCache.
 */
class eo {
    constructor(t, e, n) {
        this.ds = t, this.Bs = e, this.indexManager = n;
    }
    /**
     * Get the local view of the document identified by `key`.
     *
     * @returns Local view of the document or null if we don't have any cached
     * state for it.
     */    Ls(t, e) {
        return this.Bs.getAllMutationBatchesAffectingDocumentKey(t, e).next((n => this.Us(t, e, n)));
    }
    /** Internal version of `getDocument` that allows reusing batches. */    Us(t, e, n) {
        return this.ds.getEntry(t, e).next((t => {
            for (const e of n) e.applyToLocalView(t);
            return t;
        }));
    }
    // Returns the view of the given `docs` as they would appear after applying
    // all mutations in the given `batches`.
    qs(t, e) {
        t.forEach(((t, n) => {
            for (const t of e) t.applyToLocalView(n);
        }));
    }
    /**
     * Gets the local view of the documents identified by `keys`.
     *
     * If we don't have cached state for a document in `keys`, a NoDocument will
     * be stored for that key in the resulting set.
     */    Ks(t, e) {
        return this.ds.getEntries(t, e).next((e => this.Gs(t, e).next((() => e))));
    }
    /**
     * Applies the local view the given `baseDocs` without retrieving documents
     * from the local store.
     */    Gs(t, e) {
        return this.Bs.getAllMutationBatchesAffectingDocumentKeys(t, e).next((t => this.qs(e, t)));
    }
    /**
     * Performs a query against the local view of all documents.
     *
     * @param transaction - The persistence transaction.
     * @param query - The query to match documents against.
     * @param offset - Read time and key to start scanning by (exclusive).
     */    Qs(t, e, n) {
        /**
 * Returns whether the query matches a single document by path (rather than a
 * collection).
 */
        return function(t) {
            return kt.isDocumentKey(t.path) && null === t.collectionGroup && 0 === t.filters.length;
        }(e) ? this.js(t, e.path) : Ge(e) ? this.Ws(t, e, n) : this.zs(t, e, n);
    }
    js(t, e) {
        // Just do a simple document lookup.
        return this.Ls(t, new kt(e)).next((t => {
            let e = Jn();
            return t.isFoundDocument() && (e = e.insert(t.key, t)), e;
        }));
    }
    Ws(t, e, n) {
        const s = e.collectionGroup;
        let i = Jn();
        return this.indexManager.getCollectionParents(t, s).next((r => Ti.forEach(r, (r => {
            const o = function(t, e) {
                return new Fe(e, 
                /*collectionGroup=*/ null, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt);
            }
            /**
 * Returns true if this query does not specify any query constraints that
 * could remove results.
 */ (e, r.child(s));
            return this.zs(t, o, n).next((t => {
                t.forEach(((t, e) => {
                    i = i.insert(t, e);
                }));
            }));
        })).next((() => i))));
    }
    zs(t, e, n) {
        // Query the remote documents and overlay mutations.
        let s;
        return this.ds.getAllFromCollection(t, e.path, n).next((n => (s = n, this.Bs.getAllMutationBatchesAffectingQuery(t, e)))).next((t => {
            for (const e of t) for (const t of e.mutations) {
                const n = t.key;
                let i = s.get(n);
                null == i && (
                // Create invalid document to apply mutations on top of
                i = ie.newInvalidDocument(n), s = s.insert(n, i)), Rn(t, i, e.localWriteTime), i.isFoundDocument() || (s = s.remove(n));
            }
        })).next((() => (
        // Finally, filter out any documents that don't actually match
        // the query.
        s.forEach(((t, n) => {
            Ye(e, n) || (s = s.remove(t));
        })), s)));
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A set of changes to what documents are currently in view and out of view for
 * a given query. These changes are sent to the LocalStore by the View (via
 * the SyncEngine) and are used to pin / unpin documents as appropriate.
 */ class no {
    constructor(t, e, n, s) {
        this.targetId = t, this.fromCache = e, this.Hs = n, this.Js = s;
    }
    static Ys(t, e) {
        let n = ts(), s = ts();
        for (const t of e.docChanges) switch (t.type) {
          case 0 /* Added */ :
            n = n.add(t.doc.key);
            break;

          case 1 /* Removed */ :
            s = s.add(t.doc.key);
 // do nothing
                }
        return new no(t, e.fromCache, n, s);
    }
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A query engine that takes advantage of the target document mapping in the
 * QueryCache. Query execution is optimized by only reading the documents that
 * previously matched a query plus any documents that were edited after the
 * query was last listened to.
 *
 * There are some cases when this optimization is not guaranteed to produce
 * the same results as full collection scans. In these cases, query
 * processing falls back to full scans. These cases are:
 *
 * - Limit queries where a document that matched the query previously no longer
 *   matches the query.
 *
 * - Limit queries where a document edit may cause the document to sort below
 *   another document that is in the local cache.
 *
 * - Queries that have never been CURRENT or free of limbo documents.
 */ class so {
    /** Sets the document view to query against. */
    Xs(t) {
        this.Zs = t;
    }
    /** Returns all local documents matching the specified query. */    Qs(t, e, n, s) {
        // Queries that match all documents don't benefit from using
        // key-based lookups. It is more efficient to scan all documents in a
        // collection, rather than to perform individual lookups.
        return function(t) {
            return 0 === t.filters.length && null === t.limit && null == t.startAt && null == t.endAt && (0 === t.explicitOrderBy.length || 1 === t.explicitOrderBy.length && t.explicitOrderBy[0].field.isKeyField());
        }(e) || n.isEqual(ht.min()) ? this.ti(t, e) : this.Zs.Ks(t, s).next((i => {
            const r = this.ei(e, i);
            return (Le(e) || Ue(e)) && this.ni(e.limitType, r, s, n) ? this.ti(t, e) : (M() <= u.DEBUG && F("QueryEngine", "Re-using previous result from %s to execute query: %s", n.toString(), Je(e)), 
            this.Zs.Qs(t, e, he(n, -1)).next((t => (
            // We merge `previousResults` into `updateResults`, since
            // `updateResults` is already a DocumentMap. If a document is
            // contained in both lists, then its contents are the same.
            r.forEach((e => {
                t = t.insert(e.key, e);
            })), t))));
        }));
        // Queries that have never seen a snapshot without limbo free documents
        // should also be run as a full collection scan.
        }
    /** Applies the query filter and sorting to the provided documents.  */    ei(t, e) {
        // Sort the documents and re-apply the query filter since previously
        // matching documents do not necessarily still match the query.
        let n = new Gn(Ze(t));
        return e.forEach(((e, s) => {
            Ye(t, s) && (n = n.add(s));
        })), n;
    }
    /**
     * Determines if a limit query needs to be refilled from cache, making it
     * ineligible for index-free execution.
     *
     * @param sortedPreviousResults - The documents that matched the query when it
     * was last synchronized, sorted by the query's comparator.
     * @param remoteKeys - The document keys that matched the query at the last
     * snapshot.
     * @param limboFreeSnapshotVersion - The version of the snapshot when the
     * query was last synchronized.
     */    ni(t, e, n, s) {
        // The query needs to be refilled if a previously matching document no
        // longer matches.
        if (n.size !== e.size) return !0;
        // Limit queries are not eligible for index-free query execution if there is
        // a potential that an older document from cache now sorts before a document
        // that was previously part of the limit. This, however, can only happen if
        // the document at the edge of the limit goes out of limit.
        // If a document that is not the limit boundary sorts differently,
        // the boundary of the limit itself did not change and documents from cache
        // will continue to be "rejected" by this boundary. Therefore, we can ignore
        // any modifications that don't affect the last document.
                const i = "F" /* First */ === t ? e.last() : e.first();
        return !!i && (i.hasPendingWrites || i.version.compareTo(s) > 0);
    }
    ti(t, e) {
        return M() <= u.DEBUG && F("QueryEngine", "Using full collection scan to execute query:", Je(e)), 
        this.Zs.Qs(t, e, fe.min());
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Implements `LocalStore` interface.
 *
 * Note: some field defined in this class might have public access level, but
 * the class is not exported so they are only accessible from this module.
 * This is useful to implement optional features (like bundles) in free
 * functions, such that they are tree-shakeable.
 */
class io {
    constructor(
    /** Manages our in-memory or durable persistence. */
    t, e, n, s) {
        this.persistence = t, this.si = e, this.M = s, 
        /**
         * Maps a targetID to data about its target.
         *
         * PORTING NOTE: We are using an immutable data structure on Web to make re-runs
         * of `applyRemoteEvent()` idempotent.
         */
        this.ii = new Un(ot), 
        /** Maps a target to its targetID. */
        // TODO(wuandy): Evaluate if TargetId can be part of Target.
        this.ri = new Ln((t => me(t)), ye), 
        /**
         * A per collection group index of the last read time processed by
         * `getNewDocumentChanges()`.
         *
         * PORTING NOTE: This is only used for multi-tab synchronization.
         */
        this.oi = new Map, this.ui = t.getRemoteDocumentCache(), this.fs = t.getTargetCache(), 
        this._s = t.getBundleCache(), this.ai(n);
    }
    ai(t) {
        // TODO(indexing): Add spec tests that test these components change after a
        // user change
        this.indexManager = this.persistence.getIndexManager(t), this.Bs = this.persistence.getMutationQueue(t, this.indexManager), 
        this.ci = new eo(this.ui, this.Bs, this.indexManager), this.ui.setIndexManager(this.indexManager), 
        this.si.Xs(this.ci);
    }
    collectGarbage(t) {
        return this.persistence.runTransaction("Collect garbage", "readwrite-primary", (e => t.collect(e, this.ii)));
    }
}

function ro(
/** Manages our in-memory or durable persistence. */
t, e, n, s) {
    return new io(t, e, n, s);
}

/**
 * Tells the LocalStore that the currently authenticated user has changed.
 *
 * In response the local store switches the mutation queue to the new user and
 * returns any resulting document changes.
 */
// PORTING NOTE: Android and iOS only return the documents affected by the
// change.
async function oo(t, e) {
    const n = G(t);
    return await n.persistence.runTransaction("Handle user change", "readonly", (t => {
        // Swap out the mutation queue, grabbing the pending mutation batches
        // before and after.
        let s;
        return n.Bs.getAllMutationBatches(t).next((i => (s = i, n.ai(e), n.Bs.getAllMutationBatches(t)))).next((e => {
            const i = [], r = [];
            // Union the old/new changed keys.
            let o = ts();
            for (const t of s) {
                i.push(t.batchId);
                for (const e of t.mutations) o = o.add(e.key);
            }
            for (const t of e) {
                r.push(t.batchId);
                for (const e of t.mutations) o = o.add(e.key);
            }
            // Return the set of all (potentially) changed documents and the list
            // of mutation batch IDs that were affected by change.
                        return n.ci.Ks(t, o).next((t => ({
                hi: t,
                removedBatchIds: i,
                addedBatchIds: r
            })));
        }));
    }));
}

/* Accepts locally generated Mutations and commit them to storage. */
/**
 * Acknowledges the given batch.
 *
 * On the happy path when a batch is acknowledged, the local store will
 *
 *  + remove the batch from the mutation queue;
 *  + apply the changes to the remote document cache;
 *  + recalculate the latency compensated view implied by those changes (there
 *    may be mutations in the queue that affect the documents but haven't been
 *    acknowledged yet); and
 *  + give the changed documents back the sync engine
 *
 * @returns The resulting (modified) documents.
 */
function uo(t, e) {
    const n = G(t);
    return n.persistence.runTransaction("Acknowledge batch", "readwrite-primary", (t => {
        const s = e.batch.keys(), i = n.ui.newChangeBuffer({
            trackRemovals: !0
        });
        return function(t, e, n, s) {
            const i = n.batch, r = i.keys();
            let o = Ti.resolve();
            return r.forEach((t => {
                o = o.next((() => s.getEntry(e, t))).next((e => {
                    const r = n.docVersions.get(t);
                    q(null !== r), e.version.compareTo(r) < 0 && (i.applyToRemoteDocument(e, n), e.isValidDocument() && (
                    // We use the commitVersion as the readTime rather than the
                    // document's updateTime since the updateTime is not advanced
                    // for updates that do not modify the underlying document.
                    e.setReadTime(n.commitVersion), s.addEntry(e)));
                }));
            })), o.next((() => t.Bs.removeMutationBatch(e, i)));
        }
        /** Returns the local view of the documents affected by a mutation batch. */
        // PORTING NOTE: Multi-Tab only.
        (n, t, e, i).next((() => i.apply(t))).next((() => n.Bs.performConsistencyCheck(t))).next((() => n.ci.Ks(t, s)));
    }));
}

/**
 * Removes mutations from the MutationQueue for the specified batch;
 * LocalDocuments will be recalculated.
 *
 * @returns The resulting modified documents.
 */
/**
 * Returns the last consistent snapshot processed (used by the RemoteStore to
 * determine whether to buffer incoming snapshots from the backend).
 */
function ao(t) {
    const e = G(t);
    return e.persistence.runTransaction("Get last remote snapshot version", "readonly", (t => e.fs.getLastRemoteSnapshotVersion(t)));
}

/**
 * Updates the "ground-state" (remote) documents. We assume that the remote
 * event reflects any write batches that have been acknowledged or rejected
 * (i.e. we do not re-apply local mutations to updates from this event).
 *
 * LocalDocuments are re-calculated if there are remaining mutations in the
 * queue.
 */ function co(t, e) {
    const n = G(t), s = e.snapshotVersion;
    let i = n.ii;
    return n.persistence.runTransaction("Apply remote event", "readwrite-primary", (t => {
        const r = n.ui.newChangeBuffer({
            trackRemovals: !0
        });
        // Reset newTargetDataByTargetMap in case this transaction gets re-run.
                i = n.ii;
        const o = [];
        e.targetChanges.forEach(((r, u) => {
            const a = i.get(u);
            if (!a) return;
            // Only update the remote keys if the target is still active. This
            // ensures that we can persist the updated target data along with
            // the updated assignment.
                        o.push(n.fs.removeMatchingKeys(t, r.removedDocuments, u).next((() => n.fs.addMatchingKeys(t, r.addedDocuments, u))));
            let c = a.withSequenceNumber(t.currentSequenceNumber);
            e.targetMismatches.has(u) ? c = c.withResumeToken(Tt.EMPTY_BYTE_STRING, ht.min()).withLastLimboFreeSnapshotVersion(ht.min()) : r.resumeToken.approximateByteSize() > 0 && (c = c.withResumeToken(r.resumeToken, s)), 
            i = i.insert(u, c), 
            // Update the target data if there are target changes (or if
            // sufficient time has passed since the last update).
            /**
 * Returns true if the newTargetData should be persisted during an update of
 * an active target. TargetData should always be persisted when a target is
 * being released and should not call this function.
 *
 * While the target is active, TargetData updates can be omitted when nothing
 * about the target has changed except metadata like the resume token or
 * snapshot version. Occasionally it's worth the extra write to prevent these
 * values from getting too stale after a crash, but this doesn't have to be
 * too frequent.
 */
            function(t, e, n) {
                // Always persist target data if we don't already have a resume token.
                if (0 === t.resumeToken.approximateByteSize()) return !0;
                // Don't allow resume token changes to be buffered indefinitely. This
                // allows us to be reasonably up-to-date after a crash and avoids needing
                // to loop over all active queries on shutdown. Especially in the browser
                // we may not get time to do anything interesting while the current tab is
                // closing.
                                if (e.snapshotVersion.toMicroseconds() - t.snapshotVersion.toMicroseconds() >= 3e8) return !0;
                // Otherwise if the only thing that has changed about a target is its resume
                // token it's not worth persisting. Note that the RemoteStore keeps an
                // in-memory view of the currently active targets which includes the current
                // resume token, so stream failure or user changes will still use an
                // up-to-date resume token regardless of what we do here.
                                return n.addedDocuments.size + n.modifiedDocuments.size + n.removedDocuments.size > 0;
            }
            /**
 * Notifies local store of the changed views to locally pin documents.
 */ (a, c, r) && o.push(n.fs.updateTargetData(t, c));
        }));
        let u = zn();
        // HACK: The only reason we allow a null snapshot version is so that we
        // can synthesize remote events when we get permission denied errors while
        // trying to resolve the state of a locally cached document that is in
        // limbo.
        if (e.documentUpdates.forEach((s => {
            e.resolvedLimboDocuments.has(s) && o.push(n.persistence.referenceDelegate.updateLimboDocument(t, s));
        })), 
        // Each loop iteration only affects its "own" doc, so it's safe to get all the remote
        // documents in advance in a single call.
        o.push(ho(t, r, e.documentUpdates).next((t => {
            u = t;
        }))), !s.isEqual(ht.min())) {
            const e = n.fs.getLastRemoteSnapshotVersion(t).next((e => n.fs.setTargetsMetadata(t, t.currentSequenceNumber, s)));
            o.push(e);
        }
        return Ti.waitFor(o).next((() => r.apply(t))).next((() => n.ci.Gs(t, u))).next((() => u));
    })).then((t => (n.ii = i, t)));
}

/**
 * Populates document change buffer with documents from backend or a bundle.
 * Returns the document changes resulting from applying those documents.
 *
 * @param txn - Transaction to use to read existing documents from storage.
 * @param documentBuffer - Document buffer to collect the resulted changes to be
 *        applied to storage.
 * @param documents - Documents to be applied.
 * @param globalVersion - A `SnapshotVersion` representing the read time if all
 *        documents have the same read time.
 * @param documentVersions - A DocumentKey-to-SnapshotVersion map if documents
 *        have their own read time.
 *
 * Note: this function will use `documentVersions` if it is defined;
 * when it is not defined, resorts to `globalVersion`.
 */ function ho(t, e, n) {
    let s = ts();
    return n.forEach((t => s = s.add(t))), e.getEntries(t, s).next((t => {
        let s = zn();
        return n.forEach(((n, i) => {
            const r = t.get(n);
            // Note: The order of the steps below is important, since we want
            // to ensure that rejected limbo resolutions (which fabricate
            // NoDocuments with SnapshotVersion.min()) never add documents to
            // cache.
                        i.isNoDocument() && i.version.isEqual(ht.min()) ? (
            // NoDocuments with SnapshotVersion.min() are used in manufactured
            // events. We remove these documents from cache since we lost
            // access.
            e.removeEntry(n, i.readTime), s = s.insert(n, i)) : !r.isValidDocument() || i.version.compareTo(r.version) > 0 || 0 === i.version.compareTo(r.version) && r.hasPendingWrites ? (e.addEntry(i), 
            s = s.insert(n, i)) : F("LocalStore", "Ignoring outdated watch update for ", n, ". Current version:", r.version, " Watch version:", i.version);
        })), s;
    }));
}

/**
 * Gets the mutation batch after the passed in batchId in the mutation queue
 * or null if empty.
 * @param afterBatchId - If provided, the batch to search after.
 * @returns The next mutation or null if there wasn't one.
 */
function lo(t, e) {
    const n = G(t);
    return n.persistence.runTransaction("Get next mutation batch", "readonly", (t => (void 0 === e && (e = -1), 
    n.Bs.getNextMutationBatchAfterBatchId(t, e))));
}

/**
 * Reads the current value of a Document with a given key or null if not
 * found - used for testing.
 */
/**
 * Assigns the given target an internal ID so that its results can be pinned so
 * they don't get GC'd. A target must be allocated in the local store before
 * the store can be used to manage its view.
 *
 * Allocating an already allocated `Target` will return the existing `TargetData`
 * for that `Target`.
 */
function fo(t, e) {
    const n = G(t);
    return n.persistence.runTransaction("Allocate target", "readwrite", (t => {
        let s;
        return n.fs.getTargetData(t, e).next((i => i ? (
        // This target has been listened to previously, so reuse the
        // previous targetID.
        // TODO(mcg): freshen last accessed date?
        s = i, Ti.resolve(s)) : n.fs.allocateTargetId(t).next((i => (s = new Oi(e, i, 0 /* Listen */ , t.currentSequenceNumber), 
        n.fs.addTargetData(t, s).next((() => s)))))));
    })).then((t => {
        // If Multi-Tab is enabled, the existing target data may be newer than
        // the in-memory data
        const s = n.ii.get(t.targetId);
        return (null === s || t.snapshotVersion.compareTo(s.snapshotVersion) > 0) && (n.ii = n.ii.insert(t.targetId, t), 
        n.ri.set(e, t.targetId)), t;
    }));
}

/**
 * Returns the TargetData as seen by the LocalStore, including updates that may
 * have not yet been persisted to the TargetCache.
 */
// Visible for testing.
/**
 * Unpins all the documents associated with the given target. If
 * `keepPersistedTargetData` is set to false and Eager GC enabled, the method
 * directly removes the associated target data from the target cache.
 *
 * Releasing a non-existing `Target` is a no-op.
 */
// PORTING NOTE: `keepPersistedTargetData` is multi-tab only.
async function _o(t, e, n) {
    const s = G(t), i = s.ii.get(e), r = n ? "readwrite" : "readwrite-primary";
    try {
        n || await s.persistence.runTransaction("Release target", r, (t => s.persistence.referenceDelegate.removeTarget(t, i)));
    } catch (t) {
        if (!bi(t)) throw t;
        // All `releaseTarget` does is record the final metadata state for the
        // target, but we've been recording this periodically during target
        // activity. If we lose this write this could cause a very slight
        // difference in the order of target deletion during GC, but we
        // don't define exact LRU semantics so this is acceptable.
        F("LocalStore", `Failed to update sequence numbers for target ${e}: ${t}`);
    }
    s.ii = s.ii.remove(e), s.ri.delete(i.target);
}

/**
 * Runs the specified query against the local store and returns the results,
 * potentially taking advantage of query data from previous executions (such
 * as the set of remote keys).
 *
 * @param usePreviousResults - Whether results from previous executions can
 * be used to optimize this query execution.
 */ function wo(t, e, n) {
    const s = G(t);
    let i = ht.min(), r = ts();
    return s.persistence.runTransaction("Execute query", "readonly", (t => function(t, e, n) {
        const s = G(t), i = s.ri.get(n);
        return void 0 !== i ? Ti.resolve(s.ii.get(i)) : s.fs.getTargetData(e, n);
    }(s, t, je(e)).next((e => {
        if (e) return i = e.lastLimboFreeSnapshotVersion, s.fs.getMatchingKeysForTargetId(t, e.targetId).next((t => {
            r = t;
        }));
    })).next((() => s.si.Qs(t, e, n ? i : ht.min(), n ? r : ts()))).next((t => (yo(s, Xe(e), t), 
    {
        documents: t,
        li: r
    })))));
}

// PORTING NOTE: Multi-Tab only.
function mo(t, e) {
    const n = G(t), s = G(n.fs), i = n.ii.get(e);
    return i ? Promise.resolve(i.target) : n.persistence.runTransaction("Get target data", "readonly", (t => s.Et(t, e).next((t => t ? t.target : null))));
}

/**
 * Returns the set of documents that have been updated since the last call.
 * If this is the first call, returns the set of changes since client
 * initialization. Further invocations will return document that have changed
 * since the prior call.
 */
// PORTING NOTE: Multi-Tab only.
function go(t, e) {
    const n = G(t), s = n.oi.get(e) || ht.min();
    // Get the current maximum read time for the collection. This should always
    // exist, but to reduce the chance for regressions we default to
    // SnapshotVersion.Min()
    // TODO(indexing): Consider removing the default value.
        return n.persistence.runTransaction("Get new document changes", "readonly", (t => n.ui.getAllFromCollectionGroup(t, e, he(s, -1), 
    /* limit= */ Number.MAX_SAFE_INTEGER))).then((t => (yo(n, e, t), t)));
}

/** Sets the collection group's maximum read time from the given documents. */
// PORTING NOTE: Multi-Tab only.
function yo(t, e, n) {
    let s = ht.min();
    n.forEach(((t, e) => {
        e.readTime.compareTo(s) > 0 && (s = e.readTime);
    })), t.oi.set(e, s);
}

/**
 * Creates a new target using the given bundle name, which will be used to
 * hold the keys of all documents from the bundle in query-document mappings.
 * This ensures that the loaded documents do not get garbage collected
 * right away.
 */
/**
 * Applies the documents from a bundle to the "ground-state" (remote)
 * documents.
 *
 * LocalDocuments are re-calculated if there are remaining mutations in the
 * queue.
 */
async function po(t, e, n, s) {
    const i = G(t);
    let r = ts(), o = zn();
    for (const t of n) {
        const n = e.fi(t.metadata.name);
        t.document && (r = r.add(n));
        const s = e.di(t);
        s.setReadTime(e._i(t.metadata.readTime)), o = o.insert(n, s);
    }
    const u = i.ui.newChangeBuffer({
        trackRemovals: !0
    }), a = await fo(i, function(t) {
        // It is OK that the path used for the query is not valid, because this will
        // not be read and queried.
        return je(Be(wt.fromString(`__bundle__/docs/${t}`)));
    }(s));
    // Allocates a target to hold all document keys from the bundle, such that
    // they will not get garbage collected right away.
        return i.persistence.runTransaction("Apply bundle documents", "readwrite", (t => ho(t, u, o).next((e => (u.apply(t), 
    e))).next((e => i.fs.removeMatchingKeysForTargetId(t, a.targetId).next((() => i.fs.addMatchingKeys(t, r, a.targetId))).next((() => i.ci.Gs(t, e))).next((() => e))))));
}

/**
 * Returns a promise of a boolean to indicate if the given bundle has already
 * been loaded and the create time is newer than the current loading bundle.
 */
/**
 * Saves the given `NamedQuery` to local persistence.
 */
async function Io(t, e, n = ts()) {
    // Allocate a target for the named query such that it can be resumed
    // from associated read time if users use it to listen.
    // NOTE: this also means if no corresponding target exists, the new target
    // will remain active and will not get collected, unless users happen to
    // unlisten the query somehow.
    const s = await fo(t, je(ji(e.bundledQuery))), i = G(t);
    return i.persistence.runTransaction("Save named query", "readwrite", (t => {
        const r = ys(e.readTime);
        // Simply save the query itself if it is older than what the SDK already
        // has.
                if (s.snapshotVersion.compareTo(r) >= 0) return i._s.saveNamedQuery(t, e);
        // Update existing target data because the query from the bundle is newer.
                const o = s.withResumeToken(Tt.EMPTY_BYTE_STRING, r);
        return i.ii = i.ii.insert(o.targetId, o), i.fs.updateTargetData(t, o).next((() => i.fs.removeMatchingKeysForTargetId(t, s.targetId))).next((() => i.fs.addMatchingKeys(t, n, s.targetId))).next((() => i._s.saveNamedQuery(t, e)));
    }));
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class To {
    constructor(t) {
        this.M = t, this.wi = new Map, this.mi = new Map;
    }
    getBundleMetadata(t, e) {
        return Ti.resolve(this.wi.get(e));
    }
    saveBundleMetadata(t, e) {
        /** Decodes a BundleMetadata proto into a BundleMetadata object. */
        var n;
        return this.wi.set(e.id, {
            id: (n = e).id,
            version: n.version,
            createTime: ys(n.createTime)
        }), Ti.resolve();
    }
    getNamedQuery(t, e) {
        return Ti.resolve(this.mi.get(e));
    }
    saveNamedQuery(t, e) {
        return this.mi.set(e.name, function(t) {
            return {
                name: t.name,
                query: ji(t.bundledQuery),
                readTime: ys(t.readTime)
            };
        }(e)), Ti.resolve();
    }
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An in-memory implementation of DocumentOverlayCache.
 */ class Eo {
    constructor() {
        // A map sorted by DocumentKey, whose value is a pair of the largest batch id
        // for the overlay and the overlay itself.
        this.overlays = new Un(kt.comparator), this.gi = new Map;
    }
    getOverlay(t, e) {
        return Ti.resolve(this.overlays.get(e));
    }
    saveOverlays(t, e, n) {
        return n.forEach(((n, s) => {
            this.Xt(t, e, s);
        })), Ti.resolve();
    }
    removeOverlaysForBatchId(t, e, n) {
        const s = this.gi.get(n);
        return void 0 !== s && (s.forEach((t => this.overlays = this.overlays.remove(t))), 
        this.gi.delete(n)), Ti.resolve();
    }
    getOverlaysForCollection(t, e, n) {
        const s = Yn(), i = e.length + 1, r = new kt(e.child("")), o = this.overlays.getIteratorFrom(r);
        for (;o.hasNext(); ) {
            const t = o.getNext().value, r = t.getKey();
            if (!e.isPrefixOf(r.path)) break;
            // Documents from sub-collections
                        r.path.length === i && (t.largestBatchId > n && s.set(t.getKey(), t));
        }
        return Ti.resolve(s);
    }
    getOverlaysForCollectionGroup(t, e, n, s) {
        let i = new Un(((t, e) => t - e));
        const r = this.overlays.getIterator();
        for (;r.hasNext(); ) {
            const t = r.getNext().value;
            if (t.getKey().getCollectionGroup() === e && t.largestBatchId > n) {
                let e = i.get(t.largestBatchId);
                null === e && (e = Yn(), i = i.insert(t.largestBatchId, e)), e.set(t.getKey(), t);
            }
        }
        const o = Yn(), u = i.getIterator();
        for (;u.hasNext(); ) {
            if (u.getNext().value.forEach(((t, e) => o.set(t, e))), o.size() >= s) break;
        }
        return Ti.resolve(o);
    }
    Xt(t, e, n) {
        if (null === n) return;
        // Remove the association of the overlay to its batch id.
                const s = this.overlays.get(n.key);
        if (null !== s) {
            const t = this.gi.get(s.largestBatchId).delete(n.key);
            this.gi.set(s.largestBatchId, t);
        }
        this.overlays = this.overlays.insert(n.key, new Mi(e, n));
        // Create the association of this overlay to the given largestBatchId.
        let i = this.gi.get(e);
        void 0 === i && (i = ts(), this.gi.set(e, i)), this.gi.set(e, i.add(n.key));
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A collection of references to a document from some kind of numbered entity
 * (either a target ID or batch ID). As references are added to or removed from
 * the set corresponding events are emitted to a registered garbage collector.
 *
 * Each reference is represented by a DocumentReference object. Each of them
 * contains enough information to uniquely identify the reference. They are all
 * stored primarily in a set sorted by key. A document is considered garbage if
 * there's no references in that set (this can be efficiently checked thanks to
 * sorting by key).
 *
 * ReferenceSet also keeps a secondary set that contains references sorted by
 * IDs. This one is used to efficiently implement removal of all references by
 * some target ID.
 */ class Ao {
    constructor() {
        // A set of outstanding references to a document sorted by key.
        this.yi = new Gn(Ro.pi), 
        // A set of outstanding references to a document sorted by target id.
        this.Ii = new Gn(Ro.Ti);
    }
    /** Returns true if the reference set contains no references. */    isEmpty() {
        return this.yi.isEmpty();
    }
    /** Adds a reference to the given document key for the given ID. */    addReference(t, e) {
        const n = new Ro(t, e);
        this.yi = this.yi.add(n), this.Ii = this.Ii.add(n);
    }
    /** Add references to the given document keys for the given ID. */    Ei(t, e) {
        t.forEach((t => this.addReference(t, e)));
    }
    /**
     * Removes a reference to the given document key for the given
     * ID.
     */    removeReference(t, e) {
        this.Ai(new Ro(t, e));
    }
    Ri(t, e) {
        t.forEach((t => this.removeReference(t, e)));
    }
    /**
     * Clears all references with a given ID. Calls removeRef() for each key
     * removed.
     */    Pi(t) {
        const e = new kt(new wt([])), n = new Ro(e, t), s = new Ro(e, t + 1), i = [];
        return this.Ii.forEachInRange([ n, s ], (t => {
            this.Ai(t), i.push(t.key);
        })), i;
    }
    bi() {
        this.yi.forEach((t => this.Ai(t)));
    }
    Ai(t) {
        this.yi = this.yi.delete(t), this.Ii = this.Ii.delete(t);
    }
    Vi(t) {
        const e = new kt(new wt([])), n = new Ro(e, t), s = new Ro(e, t + 1);
        let i = ts();
        return this.Ii.forEachInRange([ n, s ], (t => {
            i = i.add(t.key);
        })), i;
    }
    containsKey(t) {
        const e = new Ro(t, 0), n = this.yi.firstAfterOrEqual(e);
        return null !== n && t.isEqual(n.key);
    }
}

class Ro {
    constructor(t, e) {
        this.key = t, this.vi = e;
    }
    /** Compare by key then by ID */    static pi(t, e) {
        return kt.comparator(t.key, e.key) || ot(t.vi, e.vi);
    }
    /** Compare by ID then by key */    static Ti(t, e) {
        return ot(t.vi, e.vi) || kt.comparator(t.key, e.key);
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Po {
    constructor(t, e) {
        this.indexManager = t, this.referenceDelegate = e, 
        /**
         * The set of all mutations that have been sent but not yet been applied to
         * the backend.
         */
        this.Bs = [], 
        /** Next value to use when assigning sequential IDs to each mutation batch. */
        this.Si = 1, 
        /** An ordered mapping between documents and the mutations batch IDs. */
        this.Di = new Gn(Ro.pi);
    }
    checkEmpty(t) {
        return Ti.resolve(0 === this.Bs.length);
    }
    addMutationBatch(t, e, n, s) {
        const i = this.Si;
        this.Si++, this.Bs.length > 0 && this.Bs[this.Bs.length - 1];
        const r = new Ni(i, e, n, s);
        this.Bs.push(r);
        // Track references by document key and index collection parents.
        for (const e of s) this.Di = this.Di.add(new Ro(e.key, i)), this.indexManager.addToCollectionParentIndex(t, e.key.path.popLast());
        return Ti.resolve(r);
    }
    lookupMutationBatch(t, e) {
        return Ti.resolve(this.Ci(e));
    }
    getNextMutationBatchAfterBatchId(t, e) {
        const n = e + 1, s = this.xi(n), i = s < 0 ? 0 : s;
        // The requested batchId may still be out of range so normalize it to the
        // start of the queue.
                return Ti.resolve(this.Bs.length > i ? this.Bs[i] : null);
    }
    getHighestUnacknowledgedBatchId() {
        return Ti.resolve(0 === this.Bs.length ? -1 : this.Si - 1);
    }
    getAllMutationBatches(t) {
        return Ti.resolve(this.Bs.slice());
    }
    getAllMutationBatchesAffectingDocumentKey(t, e) {
        const n = new Ro(e, 0), s = new Ro(e, Number.POSITIVE_INFINITY), i = [];
        return this.Di.forEachInRange([ n, s ], (t => {
            const e = this.Ci(t.vi);
            i.push(e);
        })), Ti.resolve(i);
    }
    getAllMutationBatchesAffectingDocumentKeys(t, e) {
        let n = new Gn(ot);
        return e.forEach((t => {
            const e = new Ro(t, 0), s = new Ro(t, Number.POSITIVE_INFINITY);
            this.Di.forEachInRange([ e, s ], (t => {
                n = n.add(t.vi);
            }));
        })), Ti.resolve(this.Ni(n));
    }
    getAllMutationBatchesAffectingQuery(t, e) {
        // Use the query path as a prefix for testing if a document matches the
        // query.
        const n = e.path, s = n.length + 1;
        // Construct a document reference for actually scanning the index. Unlike
        // the prefix the document key in this reference must have an even number of
        // segments. The empty segment can be used a suffix of the query path
        // because it precedes all other segments in an ordered traversal.
        let i = n;
        kt.isDocumentKey(i) || (i = i.child(""));
        const r = new Ro(new kt(i), 0);
        // Find unique batchIDs referenced by all documents potentially matching the
        // query.
                let o = new Gn(ot);
        return this.Di.forEachWhile((t => {
            const e = t.key.path;
            return !!n.isPrefixOf(e) && (
            // Rows with document keys more than one segment longer than the query
            // path can't be matches. For example, a query on 'rooms' can't match
            // the document /rooms/abc/messages/xyx.
            // TODO(mcg): we'll need a different scanner when we implement
            // ancestor queries.
            e.length === s && (o = o.add(t.vi)), !0);
        }), r), Ti.resolve(this.Ni(o));
    }
    Ni(t) {
        // Construct an array of matching batches, sorted by batchID to ensure that
        // multiple mutations affecting the same document key are applied in order.
        const e = [];
        return t.forEach((t => {
            const n = this.Ci(t);
            null !== n && e.push(n);
        })), e;
    }
    removeMutationBatch(t, e) {
        q(0 === this.ki(e.batchId, "removed")), this.Bs.shift();
        let n = this.Di;
        return Ti.forEach(e.mutations, (s => {
            const i = new Ro(s.key, e.batchId);
            return n = n.delete(i), this.referenceDelegate.markPotentiallyOrphaned(t, s.key);
        })).next((() => {
            this.Di = n;
        }));
    }
    _n(t) {
        // No-op since the memory mutation queue does not maintain a separate cache.
    }
    containsKey(t, e) {
        const n = new Ro(e, 0), s = this.Di.firstAfterOrEqual(n);
        return Ti.resolve(e.isEqual(s && s.key));
    }
    performConsistencyCheck(t) {
        return this.Bs.length, Ti.resolve();
    }
    /**
     * Finds the index of the given batchId in the mutation queue and asserts that
     * the resulting index is within the bounds of the queue.
     *
     * @param batchId - The batchId to search for
     * @param action - A description of what the caller is doing, phrased in passive
     * form (e.g. "acknowledged" in a routine that acknowledges batches).
     */    ki(t, e) {
        return this.xi(t);
    }
    /**
     * Finds the index of the given batchId in the mutation queue. This operation
     * is O(1).
     *
     * @returns The computed index of the batch with the given batchId, based on
     * the state of the queue. Note this index can be negative if the requested
     * batchId has already been remvoed from the queue or past the end of the
     * queue if the batchId is larger than the last added batch.
     */    xi(t) {
        if (0 === this.Bs.length) 
        // As an index this is past the end of the queue
        return 0;
        // Examine the front of the queue to figure out the difference between the
        // batchId and indexes in the array. Note that since the queue is ordered
        // by batchId, if the first batch has a larger batchId then the requested
        // batchId doesn't exist in the queue.
                return t - this.Bs[0].batchId;
    }
    /**
     * A version of lookupMutationBatch that doesn't return a promise, this makes
     * other functions that uses this code easier to read and more efficent.
     */    Ci(t) {
        const e = this.xi(t);
        if (e < 0 || e >= this.Bs.length) return null;
        return this.Bs[e];
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The memory-only RemoteDocumentCache for IndexedDb. To construct, invoke
 * `newMemoryRemoteDocumentCache()`.
 */
class bo {
    /**
     * @param sizer - Used to assess the size of a document. For eager GC, this is
     * expected to just return 0 to avoid unnecessarily doing the work of
     * calculating the size.
     */
    constructor(t) {
        this.Mi = t, 
        /** Underlying cache of documents and their read times. */
        this.docs = new Un(kt.comparator), 
        /** Size of all cached documents. */
        this.size = 0;
    }
    setIndexManager(t) {
        this.indexManager = t;
    }
    /**
     * Adds the supplied entry to the cache and updates the cache size as appropriate.
     *
     * All calls of `addEntry`  are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()`.
     */    addEntry(t, e) {
        const n = e.key, s = this.docs.get(n), i = s ? s.size : 0, r = this.Mi(e);
        return this.docs = this.docs.insert(n, {
            document: e.mutableCopy(),
            size: r
        }), this.size += r - i, this.indexManager.addToCollectionParentIndex(t, n.path.popLast());
    }
    /**
     * Removes the specified entry from the cache and updates the cache size as appropriate.
     *
     * All calls of `removeEntry` are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()`.
     */    removeEntry(t) {
        const e = this.docs.get(t);
        e && (this.docs = this.docs.remove(t), this.size -= e.size);
    }
    getEntry(t, e) {
        const n = this.docs.get(e);
        return Ti.resolve(n ? n.document.mutableCopy() : ie.newInvalidDocument(e));
    }
    getEntries(t, e) {
        let n = zn();
        return e.forEach((t => {
            const e = this.docs.get(t);
            n = n.insert(t, e ? e.document.mutableCopy() : ie.newInvalidDocument(t));
        })), Ti.resolve(n);
    }
    getAllFromCollection(t, e, n) {
        let s = zn();
        // Documents are ordered by key, so we can use a prefix scan to narrow down
        // the documents we need to match the query against.
                const i = new kt(e.child("")), r = this.docs.getIteratorFrom(i);
        for (;r.hasNext(); ) {
            const {key: t, value: {document: i}} = r.getNext();
            if (!e.isPrefixOf(t.path)) break;
            t.path.length > e.length + 1 || (de(le(i), n) <= 0 || (s = s.insert(i.key, i.mutableCopy())));
        }
        return Ti.resolve(s);
    }
    getAllFromCollectionGroup(t, e, n, s) {
        // This method should only be called from the IndexBackfiller if persistence
        // is enabled.
        U();
    }
    Oi(t, e) {
        return Ti.forEach(this.docs, (t => e(t)));
    }
    newChangeBuffer(t) {
        // `trackRemovals` is ignores since the MemoryRemoteDocumentCache keeps
        // a separate changelog and does not need special handling for removals.
        return new Vo(this);
    }
    getSize(t) {
        return Ti.resolve(this.size);
    }
}

/**
 * Creates a new memory-only RemoteDocumentCache.
 *
 * @param sizer - Used to assess the size of a document. For eager GC, this is
 * expected to just return 0 to avoid unnecessarily doing the work of
 * calculating the size.
 */
/**
 * Handles the details of adding and updating documents in the MemoryRemoteDocumentCache.
 */
class Vo extends Lr {
    constructor(t) {
        super(), this.Kn = t;
    }
    applyChanges(t) {
        const e = [];
        return this.changes.forEach(((n, s) => {
            s.isValidDocument() ? e.push(this.Kn.addEntry(t, s)) : this.Kn.removeEntry(n);
        })), Ti.waitFor(e);
    }
    getFromCache(t, e) {
        return this.Kn.getEntry(t, e);
    }
    getAllFromCache(t, e) {
        return this.Kn.getEntries(t, e);
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class vo {
    constructor(t) {
        this.persistence = t, 
        /**
         * Maps a target to the data about that target
         */
        this.Fi = new Ln((t => me(t)), ye), 
        /** The last received snapshot version. */
        this.lastRemoteSnapshotVersion = ht.min(), 
        /** The highest numbered target ID encountered. */
        this.highestTargetId = 0, 
        /** The highest sequence number encountered. */
        this.$i = 0, 
        /**
         * A ordered bidirectional mapping between documents and the remote target
         * IDs.
         */
        this.Bi = new Ao, this.targetCount = 0, this.Li = vr.gn();
    }
    forEachTarget(t, e) {
        return this.Fi.forEach(((t, n) => e(n))), Ti.resolve();
    }
    getLastRemoteSnapshotVersion(t) {
        return Ti.resolve(this.lastRemoteSnapshotVersion);
    }
    getHighestSequenceNumber(t) {
        return Ti.resolve(this.$i);
    }
    allocateTargetId(t) {
        return this.highestTargetId = this.Li.next(), Ti.resolve(this.highestTargetId);
    }
    setTargetsMetadata(t, e, n) {
        return n && (this.lastRemoteSnapshotVersion = n), e > this.$i && (this.$i = e), 
        Ti.resolve();
    }
    Tn(t) {
        this.Fi.set(t.target, t);
        const e = t.targetId;
        e > this.highestTargetId && (this.Li = new vr(e), this.highestTargetId = e), t.sequenceNumber > this.$i && (this.$i = t.sequenceNumber);
    }
    addTargetData(t, e) {
        return this.Tn(e), this.targetCount += 1, Ti.resolve();
    }
    updateTargetData(t, e) {
        return this.Tn(e), Ti.resolve();
    }
    removeTargetData(t, e) {
        return this.Fi.delete(e.target), this.Bi.Pi(e.targetId), this.targetCount -= 1, 
        Ti.resolve();
    }
    removeTargets(t, e, n) {
        let s = 0;
        const i = [];
        return this.Fi.forEach(((r, o) => {
            o.sequenceNumber <= e && null === n.get(o.targetId) && (this.Fi.delete(r), i.push(this.removeMatchingKeysForTargetId(t, o.targetId)), 
            s++);
        })), Ti.waitFor(i).next((() => s));
    }
    getTargetCount(t) {
        return Ti.resolve(this.targetCount);
    }
    getTargetData(t, e) {
        const n = this.Fi.get(e) || null;
        return Ti.resolve(n);
    }
    addMatchingKeys(t, e, n) {
        return this.Bi.Ei(e, n), Ti.resolve();
    }
    removeMatchingKeys(t, e, n) {
        this.Bi.Ri(e, n);
        const s = this.persistence.referenceDelegate, i = [];
        return s && e.forEach((e => {
            i.push(s.markPotentiallyOrphaned(t, e));
        })), Ti.waitFor(i);
    }
    removeMatchingKeysForTargetId(t, e) {
        return this.Bi.Pi(e), Ti.resolve();
    }
    getMatchingKeysForTargetId(t, e) {
        const n = this.Bi.Vi(e);
        return Ti.resolve(n);
    }
    containsKey(t, e) {
        return Ti.resolve(this.Bi.containsKey(e));
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A memory-backed instance of Persistence. Data is stored only in RAM and
 * not persisted across sessions.
 */
class So {
    /**
     * The constructor accepts a factory for creating a reference delegate. This
     * allows both the delegate and this instance to have strong references to
     * each other without having nullable fields that would then need to be
     * checked or asserted on every access.
     */
    constructor(t, e) {
        this.Ui = {}, this.overlays = {}, this.es = new st(0), this.ns = !1, this.ns = !0, 
        this.referenceDelegate = t(this), this.fs = new vo(this);
        this.indexManager = new lr, this.ds = function(t) {
            return new bo(t);
        }((t => this.referenceDelegate.qi(t))), this.M = new Fi(e), this._s = new To(this.M);
    }
    start() {
        return Promise.resolve();
    }
    shutdown() {
        // No durable state to ensure is closed on shutdown.
        return this.ns = !1, Promise.resolve();
    }
    get started() {
        return this.ns;
    }
    setDatabaseDeletedListener() {
        // No op.
    }
    setNetworkEnabled() {
        // No op.
    }
    getIndexManager(t) {
        // We do not currently support indices for memory persistence, so we can
        // return the same shared instance of the memory index manager.
        return this.indexManager;
    }
    getDocumentOverlayCache(t) {
        let e = this.overlays[t.toKey()];
        return e || (e = new Eo, this.overlays[t.toKey()] = e), e;
    }
    getMutationQueue(t, e) {
        let n = this.Ui[t.toKey()];
        return n || (n = new Po(e, this.referenceDelegate), this.Ui[t.toKey()] = n), n;
    }
    getTargetCache() {
        return this.fs;
    }
    getRemoteDocumentCache() {
        return this.ds;
    }
    getBundleCache() {
        return this._s;
    }
    runTransaction(t, e, n) {
        F("MemoryPersistence", "Starting transaction:", t);
        const s = new Do(this.es.next());
        return this.referenceDelegate.Ki(), n(s).next((t => this.referenceDelegate.Gi(s).next((() => t)))).toPromise().then((t => (s.raiseOnCommittedEvent(), 
        t)));
    }
    Qi(t, e) {
        return Ti.or(Object.values(this.Ui).map((n => () => n.containsKey(t, e))));
    }
}

/**
 * Memory persistence is not actually transactional, but future implementations
 * may have transaction-scoped state.
 */ class Do extends Ii {
    constructor(t) {
        super(), this.currentSequenceNumber = t;
    }
}

class Co {
    constructor(t) {
        this.persistence = t, 
        /** Tracks all documents that are active in Query views. */
        this.ji = new Ao, 
        /** The list of documents that are potentially GCed after each transaction. */
        this.Wi = null;
    }
    static zi(t) {
        return new Co(t);
    }
    get Hi() {
        if (this.Wi) return this.Wi;
        throw U();
    }
    addReference(t, e, n) {
        return this.ji.addReference(n, e), this.Hi.delete(n.toString()), Ti.resolve();
    }
    removeReference(t, e, n) {
        return this.ji.removeReference(n, e), this.Hi.add(n.toString()), Ti.resolve();
    }
    markPotentiallyOrphaned(t, e) {
        return this.Hi.add(e.toString()), Ti.resolve();
    }
    removeTarget(t, e) {
        this.ji.Pi(e.targetId).forEach((t => this.Hi.add(t.toString())));
        const n = this.persistence.getTargetCache();
        return n.getMatchingKeysForTargetId(t, e.targetId).next((t => {
            t.forEach((t => this.Hi.add(t.toString())));
        })).next((() => n.removeTargetData(t, e)));
    }
    Ki() {
        this.Wi = new Set;
    }
    Gi(t) {
        // Remove newly orphaned documents.
        const e = this.persistence.getRemoteDocumentCache().newChangeBuffer();
        return Ti.forEach(this.Hi, (n => {
            const s = kt.fromPath(n);
            return this.Ji(t, s).next((t => {
                t || e.removeEntry(s, ht.min());
            }));
        })).next((() => (this.Wi = null, e.apply(t))));
    }
    updateLimboDocument(t, e) {
        return this.Ji(t, e).next((t => {
            t ? this.Hi.delete(e.toString()) : this.Hi.add(e.toString());
        }));
    }
    qi(t) {
        // For eager GC, we don't care about the document size, there are no size thresholds.
        return 0;
    }
    Ji(t, e) {
        return Ti.or([ () => Ti.resolve(this.ji.containsKey(e)), () => this.persistence.getTargetCache().containsKey(t, e), () => this.persistence.Qi(t, e) ]);
    }
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// The format of the LocalStorage key that stores the client state is:
//     firestore_clients_<persistence_prefix>_<instance_key>
/** Assembles the key for a client state in WebStorage */
function xo(t, e) {
    return `firestore_clients_${t}_${e}`;
}

// The format of the WebStorage key that stores the mutation state is:
//     firestore_mutations_<persistence_prefix>_<batch_id>
//     (for unauthenticated users)
// or: firestore_mutations_<persistence_prefix>_<batch_id>_<user_uid>

// 'user_uid' is last to avoid needing to escape '_' characters that it might
// contain.
/** Assembles the key for a mutation batch in WebStorage */
function No(t, e, n) {
    let s = `firestore_mutations_${t}_${n}`;
    return e.isAuthenticated() && (s += `_${e.uid}`), s;
}

// The format of the WebStorage key that stores a query target's metadata is:
//     firestore_targets_<persistence_prefix>_<target_id>
/** Assembles the key for a query state in WebStorage */
function ko(t, e) {
    return `firestore_targets_${t}_${e}`;
}

// The WebStorage prefix that stores the primary tab's online state. The
// format of the key is:
//     firestore_online_state_<persistence_prefix>
/**
 * Holds the state of a mutation batch, including its user ID, batch ID and
 * whether the batch is 'pending', 'acknowledged' or 'rejected'.
 */
// Visible for testing
class Mo {
    constructor(t, e, n, s) {
        this.user = t, this.batchId = e, this.state = n, this.error = s;
    }
    /**
     * Parses a MutationMetadata from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */    static Yi(t, e, n) {
        const s = JSON.parse(n);
        let i, r = "object" == typeof s && -1 !== [ "pending", "acknowledged", "rejected" ].indexOf(s.state) && (void 0 === s.error || "object" == typeof s.error);
        return r && s.error && (r = "string" == typeof s.error.message && "string" == typeof s.error.code, 
        r && (i = new j(s.error.code, s.error.message))), r ? new Mo(t, e, s.state, i) : ($("SharedClientState", `Failed to parse mutation state for ID '${e}': ${n}`), 
        null);
    }
    Xi() {
        const t = {
            state: this.state,
            updateTimeMs: Date.now()
        };
        return this.error && (t.error = {
            code: this.error.code,
            message: this.error.message
        }), JSON.stringify(t);
    }
}

/**
 * Holds the state of a query target, including its target ID and whether the
 * target is 'not-current', 'current' or 'rejected'.
 */
// Visible for testing
class Oo {
    constructor(t, e, n) {
        this.targetId = t, this.state = e, this.error = n;
    }
    /**
     * Parses a QueryTargetMetadata from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */    static Yi(t, e) {
        const n = JSON.parse(e);
        let s, i = "object" == typeof n && -1 !== [ "not-current", "current", "rejected" ].indexOf(n.state) && (void 0 === n.error || "object" == typeof n.error);
        return i && n.error && (i = "string" == typeof n.error.message && "string" == typeof n.error.code, 
        i && (s = new j(n.error.code, n.error.message))), i ? new Oo(t, n.state, s) : ($("SharedClientState", `Failed to parse target state for ID '${t}': ${e}`), 
        null);
    }
    Xi() {
        const t = {
            state: this.state,
            updateTimeMs: Date.now()
        };
        return this.error && (t.error = {
            code: this.error.code,
            message: this.error.message
        }), JSON.stringify(t);
    }
}

/**
 * This class represents the immutable ClientState for a client read from
 * WebStorage, containing the list of active query targets.
 */ class Fo {
    constructor(t, e) {
        this.clientId = t, this.activeTargetIds = e;
    }
    /**
     * Parses a RemoteClientState from the JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */    static Yi(t, e) {
        const n = JSON.parse(e);
        let s = "object" == typeof n && n.activeTargetIds instanceof Array, i = ns();
        for (let t = 0; s && t < n.activeTargetIds.length; ++t) s = Nt(n.activeTargetIds[t]), 
        i = i.add(n.activeTargetIds[t]);
        return s ? new Fo(t, i) : ($("SharedClientState", `Failed to parse client data for instance '${t}': ${e}`), 
        null);
    }
}

/**
 * This class represents the online state for all clients participating in
 * multi-tab. The online state is only written to by the primary client, and
 * used in secondary clients to update their query views.
 */ class $o {
    constructor(t, e) {
        this.clientId = t, this.onlineState = e;
    }
    /**
     * Parses a SharedOnlineState from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */    static Yi(t) {
        const e = JSON.parse(t);
        return "object" == typeof e && -1 !== [ "Unknown", "Online", "Offline" ].indexOf(e.onlineState) && "string" == typeof e.clientId ? new $o(e.clientId, e.onlineState) : ($("SharedClientState", `Failed to parse online state: ${t}`), 
        null);
    }
}

/**
 * Metadata state of the local client. Unlike `RemoteClientState`, this class is
 * mutable and keeps track of all pending mutations, which allows us to
 * update the range of pending mutation batch IDs as new mutations are added or
 * removed.
 *
 * The data in `LocalClientState` is not read from WebStorage and instead
 * updated via its instance methods. The updated state can be serialized via
 * `toWebStorageJSON()`.
 */
// Visible for testing.
class Bo {
    constructor() {
        this.activeTargetIds = ns();
    }
    Zi(t) {
        this.activeTargetIds = this.activeTargetIds.add(t);
    }
    tr(t) {
        this.activeTargetIds = this.activeTargetIds.delete(t);
    }
    /**
     * Converts this entry into a JSON-encoded format we can use for WebStorage.
     * Does not encode `clientId` as it is part of the key in WebStorage.
     */    Xi() {
        const t = {
            activeTargetIds: this.activeTargetIds.toArray(),
            updateTimeMs: Date.now()
        };
        return JSON.stringify(t);
    }
}

/**
 * `WebStorageSharedClientState` uses WebStorage (window.localStorage) as the
 * backing store for the SharedClientState. It keeps track of all active
 * clients and supports modifications of the local client's data.
 */ class Lo {
    constructor(t, e, n, s, i) {
        this.window = t, this.Yn = e, this.persistenceKey = n, this.er = s, this.syncEngine = null, 
        this.onlineStateHandler = null, this.sequenceNumberHandler = null, this.nr = this.sr.bind(this), 
        this.ir = new Un(ot), this.started = !1, 
        /**
         * Captures WebStorage events that occur before `start()` is called. These
         * events are replayed once `WebStorageSharedClientState` is started.
         */
        this.rr = [];
        // Escape the special characters mentioned here:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
        const r = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        this.storage = this.window.localStorage, this.currentUser = i, this.ur = xo(this.persistenceKey, this.er), 
        this.ar = 
        /** Assembles the key for the current sequence number. */
        function(t) {
            return `firestore_sequence_number_${t}`;
        }
        /**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ (this.persistenceKey), this.ir = this.ir.insert(this.er, new Bo), this.cr = new RegExp(`^firestore_clients_${r}_([^_]*)$`), 
        this.hr = new RegExp(`^firestore_mutations_${r}_(\\d+)(?:_(.*))?$`), this.lr = new RegExp(`^firestore_targets_${r}_(\\d+)$`), 
        this.dr = 
        /** Assembles the key for the online state of the primary tab. */
        function(t) {
            return `firestore_online_state_${t}`;
        }
        // The WebStorage prefix that plays as a event to indicate the remote documents
        // might have changed due to some secondary tabs loading a bundle.
        // format of the key is:
        //     firestore_bundle_loaded_v2_<persistenceKey>
        // The version ending with "v2" stores the list of modified collection groups.
        (this.persistenceKey), this._r = function(t) {
            return `firestore_bundle_loaded_v2_${t}`;
        }
        // The WebStorage key prefix for the key that stores the last sequence number allocated. The key
        // looks like 'firestore_sequence_number_<persistence_prefix>'.
        (this.persistenceKey), 
        // Rather than adding the storage observer during start(), we add the
        // storage observer during initialization. This ensures that we collect
        // events before other components populate their initial state (during their
        // respective start() calls). Otherwise, we might for example miss a
        // mutation that is added after LocalStore's start() processed the existing
        // mutations but before we observe WebStorage events.
        this.window.addEventListener("storage", this.nr);
    }
    /** Returns 'true' if WebStorage is available in the current environment. */    static vt(t) {
        return !(!t || !t.localStorage);
    }
    async start() {
        // Retrieve the list of existing clients to backfill the data in
        // SharedClientState.
        const t = await this.syncEngine.Fs();
        for (const e of t) {
            if (e === this.er) continue;
            const t = this.getItem(xo(this.persistenceKey, e));
            if (t) {
                const n = Fo.Yi(e, t);
                n && (this.ir = this.ir.insert(n.clientId, n));
            }
        }
        this.wr();
        // Check if there is an existing online state and call the callback handler
        // if applicable.
        const e = this.storage.getItem(this.dr);
        if (e) {
            const t = this.mr(e);
            t && this.gr(t);
        }
        for (const t of this.rr) this.sr(t);
        this.rr = [], 
        // Register a window unload hook to remove the client metadata entry from
        // WebStorage even if `shutdown()` was not called.
        this.window.addEventListener("pagehide", (() => this.shutdown())), this.started = !0;
    }
    writeSequenceNumber(t) {
        this.setItem(this.ar, JSON.stringify(t));
    }
    getAllActiveQueryTargets() {
        return this.yr(this.ir);
    }
    isActiveQueryTarget(t) {
        let e = !1;
        return this.ir.forEach(((n, s) => {
            s.activeTargetIds.has(t) && (e = !0);
        })), e;
    }
    addPendingMutation(t) {
        this.pr(t, "pending");
    }
    updateMutationState(t, e, n) {
        this.pr(t, e, n), 
        // Once a final mutation result is observed by other clients, they no longer
        // access the mutation's metadata entry. Since WebStorage replays events
        // in order, it is safe to delete the entry right after updating it.
        this.Ir(t);
    }
    addLocalQueryTarget(t) {
        let e = "not-current";
        // Lookup an existing query state if the target ID was already registered
        // by another tab
                if (this.isActiveQueryTarget(t)) {
            const n = this.storage.getItem(ko(this.persistenceKey, t));
            if (n) {
                const s = Oo.Yi(t, n);
                s && (e = s.state);
            }
        }
        return this.Tr.Zi(t), this.wr(), e;
    }
    removeLocalQueryTarget(t) {
        this.Tr.tr(t), this.wr();
    }
    isLocalQueryTarget(t) {
        return this.Tr.activeTargetIds.has(t);
    }
    clearQueryState(t) {
        this.removeItem(ko(this.persistenceKey, t));
    }
    updateQueryState(t, e, n) {
        this.Er(t, e, n);
    }
    handleUserChange(t, e, n) {
        e.forEach((t => {
            this.Ir(t);
        })), this.currentUser = t, n.forEach((t => {
            this.addPendingMutation(t);
        }));
    }
    setOnlineState(t) {
        this.Ar(t);
    }
    notifyBundleLoaded(t) {
        this.Rr(t);
    }
    shutdown() {
        this.started && (this.window.removeEventListener("storage", this.nr), this.removeItem(this.ur), 
        this.started = !1);
    }
    getItem(t) {
        const e = this.storage.getItem(t);
        return F("SharedClientState", "READ", t, e), e;
    }
    setItem(t, e) {
        F("SharedClientState", "SET", t, e), this.storage.setItem(t, e);
    }
    removeItem(t) {
        F("SharedClientState", "REMOVE", t), this.storage.removeItem(t);
    }
    sr(t) {
        // Note: The function is typed to take Event to be interface-compatible with
        // `Window.addEventListener`.
        const e = t;
        if (e.storageArea === this.storage) {
            if (F("SharedClientState", "EVENT", e.key, e.newValue), e.key === this.ur) return void $("Received WebStorage notification for local change. Another client might have garbage-collected our state");
            this.Yn.enqueueRetryable((async () => {
                if (this.started) {
                    if (null !== e.key) if (this.cr.test(e.key)) {
                        if (null == e.newValue) {
                            const t = this.Pr(e.key);
                            return this.br(t, null);
                        }
                        {
                            const t = this.Vr(e.key, e.newValue);
                            if (t) return this.br(t.clientId, t);
                        }
                    } else if (this.hr.test(e.key)) {
                        if (null !== e.newValue) {
                            const t = this.vr(e.key, e.newValue);
                            if (t) return this.Sr(t);
                        }
                    } else if (this.lr.test(e.key)) {
                        if (null !== e.newValue) {
                            const t = this.Dr(e.key, e.newValue);
                            if (t) return this.Cr(t);
                        }
                    } else if (e.key === this.dr) {
                        if (null !== e.newValue) {
                            const t = this.mr(e.newValue);
                            if (t) return this.gr(t);
                        }
                    } else if (e.key === this.ar) {
                        const t = function(t) {
                            let e = st.A;
                            if (null != t) try {
                                const n = JSON.parse(t);
                                q("number" == typeof n), e = n;
                            } catch (t) {
                                $("SharedClientState", "Failed to read sequence number from WebStorage", t);
                            }
                            return e;
                        }
                        /**
 * `MemorySharedClientState` is a simple implementation of SharedClientState for
 * clients using memory persistence. The state in this class remains fully
 * isolated and no synchronization is performed.
 */ (e.newValue);
                        t !== st.A && this.sequenceNumberHandler(t);
                    } else if (e.key === this._r) {
                        const t = this.Nr(e.newValue);
                        await Promise.all(t.map((t => this.syncEngine.kr(t))));
                    }
                } else this.rr.push(e);
            }));
        }
    }
    get Tr() {
        return this.ir.get(this.er);
    }
    wr() {
        this.setItem(this.ur, this.Tr.Xi());
    }
    pr(t, e, n) {
        const s = new Mo(this.currentUser, t, e, n), i = No(this.persistenceKey, this.currentUser, t);
        this.setItem(i, s.Xi());
    }
    Ir(t) {
        const e = No(this.persistenceKey, this.currentUser, t);
        this.removeItem(e);
    }
    Ar(t) {
        const e = {
            clientId: this.er,
            onlineState: t
        };
        this.storage.setItem(this.dr, JSON.stringify(e));
    }
    Er(t, e, n) {
        const s = ko(this.persistenceKey, t), i = new Oo(t, e, n);
        this.setItem(s, i.Xi());
    }
    Rr(t) {
        const e = JSON.stringify(Array.from(t));
        this.setItem(this._r, e);
    }
    /**
     * Parses a client state key in WebStorage. Returns null if the key does not
     * match the expected key format.
     */    Pr(t) {
        const e = this.cr.exec(t);
        return e ? e[1] : null;
    }
    /**
     * Parses a client state in WebStorage. Returns 'null' if the value could not
     * be parsed.
     */    Vr(t, e) {
        const n = this.Pr(t);
        return Fo.Yi(n, e);
    }
    /**
     * Parses a mutation batch state in WebStorage. Returns 'null' if the value
     * could not be parsed.
     */    vr(t, e) {
        const n = this.hr.exec(t), s = Number(n[1]), i = void 0 !== n[2] ? n[2] : null;
        return Mo.Yi(new x(i), s, e);
    }
    /**
     * Parses a query target state from WebStorage. Returns 'null' if the value
     * could not be parsed.
     */    Dr(t, e) {
        const n = this.lr.exec(t), s = Number(n[1]);
        return Oo.Yi(s, e);
    }
    /**
     * Parses an online state from WebStorage. Returns 'null' if the value
     * could not be parsed.
     */    mr(t) {
        return $o.Yi(t);
    }
    Nr(t) {
        return JSON.parse(t);
    }
    async Sr(t) {
        if (t.user.uid === this.currentUser.uid) return this.syncEngine.Mr(t.batchId, t.state, t.error);
        F("SharedClientState", `Ignoring mutation for non-active user ${t.user.uid}`);
    }
    Cr(t) {
        return this.syncEngine.Or(t.targetId, t.state, t.error);
    }
    br(t, e) {
        const n = e ? this.ir.insert(t, e) : this.ir.remove(t), s = this.yr(this.ir), i = this.yr(n), r = [], o = [];
        return i.forEach((t => {
            s.has(t) || r.push(t);
        })), s.forEach((t => {
            i.has(t) || o.push(t);
        })), this.syncEngine.Fr(r, o).then((() => {
            this.ir = n;
        }));
    }
    gr(t) {
        // We check whether the client that wrote this online state is still active
        // by comparing its client ID to the list of clients kept active in
        // IndexedDb. If a client does not update their IndexedDb client state
        // within 5 seconds, it is considered inactive and we don't emit an online
        // state event.
        this.ir.get(t.clientId) && this.onlineStateHandler(t.onlineState);
    }
    yr(t) {
        let e = ns();
        return t.forEach(((t, n) => {
            e = e.unionWith(n.activeTargetIds);
        })), e;
    }
}

class Uo {
    constructor() {
        this.$r = new Bo, this.Br = {}, this.onlineStateHandler = null, this.sequenceNumberHandler = null;
    }
    addPendingMutation(t) {
        // No op.
    }
    updateMutationState(t, e, n) {
        // No op.
    }
    addLocalQueryTarget(t) {
        return this.$r.Zi(t), this.Br[t] || "not-current";
    }
    updateQueryState(t, e, n) {
        this.Br[t] = e;
    }
    removeLocalQueryTarget(t) {
        this.$r.tr(t);
    }
    isLocalQueryTarget(t) {
        return this.$r.activeTargetIds.has(t);
    }
    clearQueryState(t) {
        delete this.Br[t];
    }
    getAllActiveQueryTargets() {
        return this.$r.activeTargetIds;
    }
    isActiveQueryTarget(t) {
        return this.$r.activeTargetIds.has(t);
    }
    start() {
        return this.$r = new Bo, Promise.resolve();
    }
    handleUserChange(t, e, n) {
        // No op.
    }
    setOnlineState(t) {
        // No op.
    }
    shutdown() {}
    writeSequenceNumber(t) {}
    notifyBundleLoaded(t) {
        // No op.
    }
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class qo {
    Lr(t) {
        // No-op.
    }
    shutdown() {
        // No-op.
    }
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// References to `window` are guarded by BrowserConnectivityMonitor.isAvailable()
/* eslint-disable no-restricted-globals */
/**
 * Browser implementation of ConnectivityMonitor.
 */
class Ko {
    constructor() {
        this.Ur = () => this.qr(), this.Kr = () => this.Gr(), this.Qr = [], this.jr();
    }
    Lr(t) {
        this.Qr.push(t);
    }
    shutdown() {
        window.removeEventListener("online", this.Ur), window.removeEventListener("offline", this.Kr);
    }
    jr() {
        window.addEventListener("online", this.Ur), window.addEventListener("offline", this.Kr);
    }
    qr() {
        F("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
        for (const t of this.Qr) t(0 /* AVAILABLE */);
    }
    Gr() {
        F("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
        for (const t of this.Qr) t(1 /* UNAVAILABLE */);
    }
    // TODO(chenbrian): Consider passing in window either into this component or
    // here for testing via FakeWindow.
    /** Checks that all used attributes of window are available. */
    static vt() {
        return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener;
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Go = {
    BatchGetDocuments: "batchGet",
    Commit: "commit",
    RunQuery: "runQuery"
};

/**
 * Maps RPC names to the corresponding REST endpoint name.
 *
 * We use array notation to avoid mangling.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provides a simple helper class that implements the Stream interface to
 * bridge to other implementations that are streams but do not implement the
 * interface. The stream callbacks are invoked with the callOn... methods.
 */
class Qo {
    constructor(t) {
        this.Wr = t.Wr, this.zr = t.zr;
    }
    Hr(t) {
        this.Jr = t;
    }
    Yr(t) {
        this.Xr = t;
    }
    onMessage(t) {
        this.Zr = t;
    }
    close() {
        this.zr();
    }
    send(t) {
        this.Wr(t);
    }
    eo() {
        this.Jr();
    }
    no(t) {
        this.Xr(t);
    }
    so(t) {
        this.Zr(t);
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class jo extends 
/**
 * Base class for all Rest-based connections to the backend (WebChannel and
 * HTTP).
 */
class {
    constructor(t) {
        this.databaseInfo = t, this.databaseId = t.databaseId;
        const e = t.ssl ? "https" : "http";
        this.io = e + "://" + t.host, this.ro = "projects/" + this.databaseId.projectId + "/databases/" + this.databaseId.database + "/documents";
    }
    oo(t, e, n, s, i) {
        const r = this.uo(t, e);
        F("RestConnection", "Sending: ", r, n);
        const o = {};
        return this.ao(o, s, i), this.co(t, r, o, n).then((t => (F("RestConnection", "Received: ", t), 
        t)), (e => {
            throw B("RestConnection", `${t} failed with error: `, e, "url: ", r, "request:", n), 
            e;
        }));
    }
    ho(t, e, n, s, i) {
        // The REST API automatically aggregates all of the streamed results, so we
        // can just use the normal invoke() method.
        return this.oo(t, e, n, s, i);
    }
    /**
     * Modifies the headers for a request, adding any authorization token if
     * present and any additional headers for the request.
     */    ao(t, e, n) {
        t["X-Goog-Api-Client"] = "gl-js/ fire/" + N, 
        // Content-Type: text/plain will avoid preflight requests which might
        // mess with CORS and redirects by proxies. If we add custom headers
        // we will need to change this code to potentially use the $httpOverwrite
        // parameter supported by ESF to avoid triggering preflight requests.
        t["Content-Type"] = "text/plain", this.databaseInfo.appId && (t["X-Firebase-GMPID"] = this.databaseInfo.appId), 
        e && e.headers.forEach(((e, n) => t[n] = e)), n && n.headers.forEach(((e, n) => t[n] = e));
    }
    uo(t, e) {
        const n = Go[t];
        return `${this.io}/v1/${e}:${n}`;
    }
} {
    constructor(t) {
        super(t), this.forceLongPolling = t.forceLongPolling, this.autoDetectLongPolling = t.autoDetectLongPolling, 
        this.useFetchStreams = t.useFetchStreams;
    }
    co(t, e, n, s) {
        return new Promise(((i, r) => {
            const o = new E;
            o.listenOnce(A.COMPLETE, (() => {
                try {
                    switch (o.getLastErrorCode()) {
                      case R.NO_ERROR:
                        const e = o.getResponseJson();
                        F("Connection", "XHR received:", JSON.stringify(e)), i(e);
                        break;

                      case R.TIMEOUT:
                        F("Connection", 'RPC "' + t + '" timed out'), r(new j(Q.DEADLINE_EXCEEDED, "Request time out"));
                        break;

                      case R.HTTP_ERROR:
                        const n = o.getStatus();
                        if (F("Connection", 'RPC "' + t + '" failed with status:', n, "response text:", o.getResponseText()), 
                        n > 0) {
                            const t = o.getResponseJson().error;
                            if (t && t.status && t.message) {
                                const e = function(t) {
                                    const e = t.toLowerCase().replace(/_/g, "-");
                                    return Object.values(Q).indexOf(e) >= 0 ? e : Q.UNKNOWN;
                                }(t.status);
                                r(new j(e, t.message));
                            } else r(new j(Q.UNKNOWN, "Server responded with status " + o.getStatus()));
                        } else 
                        // If we received an HTTP_ERROR but there's no status code,
                        // it's most probably a connection issue
                        r(new j(Q.UNAVAILABLE, "Connection failed."));
                        break;

                      default:
                        U();
                    }
                } finally {
                    F("Connection", 'RPC "' + t + '" completed.');
                }
            }));
            const u = JSON.stringify(s);
            o.send(e, "POST", u, n, 15);
        }));
    }
    lo(t, e, n) {
        const s = [ this.io, "/", "google.firestore.v1.Firestore", "/", t, "/channel" ], i = P(), r = b(), o = {
            // Required for backend stickiness, routing behavior is based on this
            // parameter.
            httpSessionIdParam: "gsessionid",
            initMessageHeaders: {},
            messageUrlParams: {
                // This param is used to improve routing and project isolation by the
                // backend and must be included in every request.
                database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`
            },
            sendRawJson: !0,
            supportsCrossDomainXhr: !0,
            internalChannelParams: {
                // Override the default timeout (randomized between 10-20 seconds) since
                // a large write batch on a slow internet connection may take a long
                // time to send to the backend. Rather than have WebChannel impose a
                // tight timeout which could lead to infinite timeouts and retries, we
                // set it very large (5-10 minutes) and rely on the browser's builtin
                // timeouts to kick in if the request isn't working.
                forwardChannelRequestTimeoutMs: 6e5
            },
            forceLongPolling: this.forceLongPolling,
            detectBufferingProxy: this.autoDetectLongPolling
        };
        this.useFetchStreams && (o.xmlHttpFactory = new V({})), this.ao(o.initMessageHeaders, e, n), 
        // Sending the custom headers we just added to request.initMessageHeaders
        // (Authorization, etc.) will trigger the browser to make a CORS preflight
        // request because the XHR will no longer meet the criteria for a "simple"
        // CORS request:
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests
        // Therefore to avoid the CORS preflight request (an extra network
        // roundtrip), we use the httpHeadersOverwriteParam option to specify that
        // the headers should instead be encoded into a special "$httpHeaders" query
        // parameter, which is recognized by the webchannel backend. This is
        // formally defined here:
        // https://github.com/google/closure-library/blob/b0e1815b13fb92a46d7c9b3c30de5d6a396a3245/closure/goog/net/rpc/httpcors.js#L32
        // TODO(b/145624756): There is a backend bug where $httpHeaders isn't respected if the request
        // doesn't have an Origin header. So we have to exclude a few browser environments that are
        // known to (sometimes) not include an Origin. See
        // https://github.com/firebase/firebase-js-sdk/issues/1491.
        d() || _() || w() || m() || g() || y() || (o.httpHeadersOverwriteParam = "$httpHeaders");
        const u = s.join("");
        F("Connection", "Creating WebChannel: " + u, o);
        const a = i.createWebChannel(u, o);
        // WebChannel supports sending the first message with the handshake - saving
        // a network round trip. However, it will have to call send in the same
        // JS event loop as open. In order to enforce this, we delay actually
        // opening the WebChannel until send is called. Whether we have called
        // open is tracked with this variable.
                let c = !1, h = !1;
        // A flag to determine whether the stream was closed (by us or through an
        // error/close event) to avoid delivering multiple close events or sending
        // on a closed stream
                const l = new Qo({
            Wr: t => {
                h ? F("Connection", "Not sending because WebChannel is closed:", t) : (c || (F("Connection", "Opening WebChannel transport."), 
                a.open(), c = !0), F("Connection", "WebChannel sending:", t), a.send(t));
            },
            zr: () => a.close()
        }), f = (t, e, n) => {
            // TODO(dimond): closure typing seems broken because WebChannel does
            // not implement goog.events.Listenable
            t.listen(e, (t => {
                try {
                    n(t);
                } catch (t) {
                    setTimeout((() => {
                        throw t;
                    }), 0);
                }
            }));
        };
        // Closure events are guarded and exceptions are swallowed, so catch any
        // exception and rethrow using a setTimeout so they become visible again.
        // Note that eventually this function could go away if we are confident
        // enough the code is exception free.
                return f(a, v.EventType.OPEN, (() => {
            h || F("Connection", "WebChannel transport opened.");
        })), f(a, v.EventType.CLOSE, (() => {
            h || (h = !0, F("Connection", "WebChannel transport closed"), l.no());
        })), f(a, v.EventType.ERROR, (t => {
            h || (h = !0, B("Connection", "WebChannel transport errored:", t), l.no(new j(Q.UNAVAILABLE, "The operation could not be completed")));
        })), f(a, v.EventType.MESSAGE, (t => {
            var e;
            if (!h) {
                const n = t.data[0];
                q(!!n);
                // TODO(b/35143891): There is a bug in One Platform that caused errors
                // (and only errors) to be wrapped in an extra array. To be forward
                // compatible with the bug we need to check either condition. The latter
                // can be removed once the fix has been rolled out.
                // Use any because msgData.error is not typed.
                const s = n, i = s.error || (null === (e = s[0]) || void 0 === e ? void 0 : e.error);
                if (i) {
                    F("Connection", "WebChannel received error:", i);
                    // error.status will be a string like 'OK' or 'NOT_FOUND'.
                    const t = i.status;
                    let e = 
                    /**
 * Maps an error Code from a GRPC status identifier like 'NOT_FOUND'.
 *
 * @returns The Code equivalent to the given status string or undefined if
 *     there is no match.
 */
                    function(t) {
                        // lookup by string
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const e = On[t];
                        if (void 0 !== e) return Bn(e);
                    }(t), n = i.message;
                    void 0 === e && (e = Q.INTERNAL, n = "Unknown error status: " + t + " with message " + i.message), 
                    // Mark closed so no further events are propagated
                    h = !0, l.no(new j(e, n)), a.close();
                } else F("Connection", "WebChannel received:", n), l.so(n);
            }
        })), f(r, S.STAT_EVENT, (t => {
            t.stat === D.PROXY ? F("Connection", "Detected buffering proxy") : t.stat === D.NOPROXY && F("Connection", "Detected no buffering proxy");
        })), setTimeout((() => {
            // Technically we could/should wait for the WebChannel opened event,
            // but because we want to send the first message with the WebChannel
            // handshake we pretend the channel opened here (asynchronously), and
            // then delay the actual open until the first message is sent.
            l.eo();
        }), 0), l;
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Initializes the WebChannelConnection for the browser. */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** The Platform's 'window' implementation or null if not available. */
function Wo() {
    // `window` is not always available, e.g. in ReactNative and WebWorkers.
    // eslint-disable-next-line no-restricted-globals
    return "undefined" != typeof window ? window : null;
}

/** The Platform's 'document' implementation or null if not available. */ function zo() {
    // `document` is not always available, e.g. in ReactNative and WebWorkers.
    // eslint-disable-next-line no-restricted-globals
    return "undefined" != typeof document ? document : null;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ho(t) {
    return new _s(t, /* useProto3Json= */ !0);
}

/**
 * An instance of the Platform's 'TextEncoder' implementation.
 */
/**
 * A helper for running delayed tasks following an exponential backoff curve
 * between attempts.
 *
 * Each delay is made up of a "base" delay which follows the exponential
 * backoff curve, and a +/- 50% "jitter" that is calculated and added to the
 * base delay. This prevents clients from accidentally synchronizing their
 * delays causing spikes of load to the backend.
 */
class Jo {
    constructor(
    /**
     * The AsyncQueue to run backoff operations on.
     */
    t, 
    /**
     * The ID to use when scheduling backoff operations on the AsyncQueue.
     */
    e, 
    /**
     * The initial delay (used as the base delay on the first retry attempt).
     * Note that jitter will still be applied, so the actual delay could be as
     * little as 0.5*initialDelayMs.
     */
    n = 1e3
    /**
     * The multiplier to use to determine the extended base delay after each
     * attempt.
     */ , s = 1.5
    /**
     * The maximum base delay after which no further backoff is performed.
     * Note that jitter will still be applied, so the actual delay could be as
     * much as 1.5*maxDelayMs.
     */ , i = 6e4) {
        this.Yn = t, this.timerId = e, this.fo = n, this._o = s, this.wo = i, this.mo = 0, 
        this.yo = null, 
        /** The last backoff attempt, as epoch milliseconds. */
        this.po = Date.now(), this.reset();
    }
    /**
     * Resets the backoff delay.
     *
     * The very next backoffAndWait() will have no delay. If it is called again
     * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
     * subsequent ones will increase according to the backoffFactor.
     */    reset() {
        this.mo = 0;
    }
    /**
     * Resets the backoff delay to the maximum delay (e.g. for use after a
     * RESOURCE_EXHAUSTED error).
     */    Io() {
        this.mo = this.wo;
    }
    /**
     * Returns a promise that resolves after currentDelayMs, and increases the
     * delay for any subsequent attempts. If there was a pending backoff operation
     * already, it will be canceled.
     */    To(t) {
        // Cancel any pending backoff operation.
        this.cancel();
        // First schedule using the current base (which may be 0 and should be
        // honored as such).
        const e = Math.floor(this.mo + this.Eo()), n = Math.max(0, Date.now() - this.po), s = Math.max(0, e - n);
        // Guard against lastAttemptTime being in the future due to a clock change.
                s > 0 && F("ExponentialBackoff", `Backing off for ${s} ms (base delay: ${this.mo} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`), 
        this.yo = this.Yn.enqueueAfterDelay(this.timerId, s, (() => (this.po = Date.now(), 
        t()))), 
        // Apply backoff factor to determine next delay and ensure it is within
        // bounds.
        this.mo *= this._o, this.mo < this.fo && (this.mo = this.fo), this.mo > this.wo && (this.mo = this.wo);
    }
    Ao() {
        null !== this.yo && (this.yo.skipDelay(), this.yo = null);
    }
    cancel() {
        null !== this.yo && (this.yo.cancel(), this.yo = null);
    }
    /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */    Eo() {
        return (Math.random() - .5) * this.mo;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A PersistentStream is an abstract base class that represents a streaming RPC
 * to the Firestore backend. It's built on top of the connections own support
 * for streaming RPCs, and adds several critical features for our clients:
 *
 *   - Exponential backoff on failure
 *   - Authentication via CredentialsProvider
 *   - Dispatching all callbacks into the shared worker queue
 *   - Closing idle streams after 60 seconds of inactivity
 *
 * Subclasses of PersistentStream implement serialization of models to and
 * from the JSON representation of the protocol buffers for a specific
 * streaming RPC.
 *
 * ## Starting and Stopping
 *
 * Streaming RPCs are stateful and need to be start()ed before messages can
 * be sent and received. The PersistentStream will call the onOpen() function
 * of the listener once the stream is ready to accept requests.
 *
 * Should a start() fail, PersistentStream will call the registered onClose()
 * listener with a FirestoreError indicating what went wrong.
 *
 * A PersistentStream can be started and stopped repeatedly.
 *
 * Generic types:
 *  SendType: The type of the outgoing message of the underlying
 *    connection stream
 *  ReceiveType: The type of the incoming message of the underlying
 *    connection stream
 *  ListenerType: The type of the listener that will be used for callbacks
 */
class Yo {
    constructor(t, e, n, s, i, r, o, u) {
        this.Yn = t, this.Ro = n, this.Po = s, this.bo = i, this.authCredentialsProvider = r, 
        this.appCheckCredentialsProvider = o, this.listener = u, this.state = 0 /* Initial */ , 
        /**
         * A close count that's incremented every time the stream is closed; used by
         * getCloseGuardedDispatcher() to invalidate callbacks that happen after
         * close.
         */
        this.Vo = 0, this.vo = null, this.So = null, this.stream = null, this.Do = new Jo(t, e);
    }
    /**
     * Returns true if start() has been called and no error has occurred. True
     * indicates the stream is open or in the process of opening (which
     * encompasses respecting backoff, getting auth tokens, and starting the
     * actual RPC). Use isOpen() to determine if the stream is open and ready for
     * outbound requests.
     */    Co() {
        return 1 /* Starting */ === this.state || 5 /* Backoff */ === this.state || this.xo();
    }
    /**
     * Returns true if the underlying RPC is open (the onOpen() listener has been
     * called) and the stream is ready for outbound requests.
     */    xo() {
        return 2 /* Open */ === this.state || 3 /* Healthy */ === this.state;
    }
    /**
     * Starts the RPC. Only allowed if isStarted() returns false. The stream is
     * not immediately ready for use: onOpen() will be invoked when the RPC is
     * ready for outbound requests, at which point isOpen() will return true.
     *
     * When start returns, isStarted() will return true.
     */    start() {
        4 /* Error */ !== this.state ? this.auth() : this.No();
    }
    /**
     * Stops the RPC. This call is idempotent and allowed regardless of the
     * current isStarted() state.
     *
     * When stop returns, isStarted() and isOpen() will both return false.
     */    async stop() {
        this.Co() && await this.close(0 /* Initial */);
    }
    /**
     * After an error the stream will usually back off on the next attempt to
     * start it. If the error warrants an immediate restart of the stream, the
     * sender can use this to indicate that the receiver should not back off.
     *
     * Each error will call the onClose() listener. That function can decide to
     * inhibit backoff if required.
     */    ko() {
        this.state = 0 /* Initial */ , this.Do.reset();
    }
    /**
     * Marks this stream as idle. If no further actions are performed on the
     * stream for one minute, the stream will automatically close itself and
     * notify the stream's onClose() handler with Status.OK. The stream will then
     * be in a !isStarted() state, requiring the caller to start the stream again
     * before further use.
     *
     * Only streams that are in state 'Open' can be marked idle, as all other
     * states imply pending network operations.
     */    Mo() {
        // Starts the idle time if we are in state 'Open' and are not yet already
        // running a timer (in which case the previous idle timeout still applies).
        this.xo() && null === this.vo && (this.vo = this.Yn.enqueueAfterDelay(this.Ro, 6e4, (() => this.Oo())));
    }
    /** Sends a message to the underlying stream. */    Fo(t) {
        this.$o(), this.stream.send(t);
    }
    /** Called by the idle timer when the stream should close due to inactivity. */    async Oo() {
        if (this.xo()) 
        // When timing out an idle stream there's no reason to force the stream into backoff when
        // it restarts so set the stream state to Initial instead of Error.
        return this.close(0 /* Initial */);
    }
    /** Marks the stream as active again. */    $o() {
        this.vo && (this.vo.cancel(), this.vo = null);
    }
    /** Cancels the health check delayed operation. */    Bo() {
        this.So && (this.So.cancel(), this.So = null);
    }
    /**
     * Closes the stream and cleans up as necessary:
     *
     * * closes the underlying GRPC stream;
     * * calls the onClose handler with the given 'error';
     * * sets internal stream state to 'finalState';
     * * adjusts the backoff timer based on the error
     *
     * A new stream can be opened by calling start().
     *
     * @param finalState - the intended state of the stream after closing.
     * @param error - the error the connection was closed with.
     */    async close(t, e) {
        // Cancel any outstanding timers (they're guaranteed not to execute).
        this.$o(), this.Bo(), this.Do.cancel(), 
        // Invalidates any stream-related callbacks (e.g. from auth or the
        // underlying stream), guaranteeing they won't execute.
        this.Vo++, 4 /* Error */ !== t ? 
        // If this is an intentional close ensure we don't delay our next connection attempt.
        this.Do.reset() : e && e.code === Q.RESOURCE_EXHAUSTED ? (
        // Log the error. (Probably either 'quota exceeded' or 'max queue length reached'.)
        $(e.toString()), $("Using maximum backoff delay to prevent overloading the backend."), 
        this.Do.Io()) : e && e.code === Q.UNAUTHENTICATED && 3 /* Healthy */ !== this.state && (
        // "unauthenticated" error means the token was rejected. This should rarely
        // happen since both Auth and AppCheck ensure a sufficient TTL when we
        // request a token. If a user manually resets their system clock this can
        // fail, however. In this case, we should get a Code.UNAUTHENTICATED error
        // before we received the first message and we need to invalidate the token
        // to ensure that we fetch a new token.
        this.authCredentialsProvider.invalidateToken(), this.appCheckCredentialsProvider.invalidateToken()), 
        // Clean up the underlying stream because we are no longer interested in events.
        null !== this.stream && (this.Lo(), this.stream.close(), this.stream = null), 
        // This state must be assigned before calling onClose() to allow the callback to
        // inhibit backoff or otherwise manipulate the state in its non-started state.
        this.state = t, 
        // Notify the listener that the stream closed.
        await this.listener.Yr(e);
    }
    /**
     * Can be overridden to perform additional cleanup before the stream is closed.
     * Calling super.tearDown() is not required.
     */    Lo() {}
    auth() {
        this.state = 1 /* Starting */;
        const t = this.Uo(this.Vo), e = this.Vo;
        // TODO(mikelehen): Just use dispatchIfNotClosed, but see TODO below.
                Promise.all([ this.authCredentialsProvider.getToken(), this.appCheckCredentialsProvider.getToken() ]).then((([t, n]) => {
            // Stream can be stopped while waiting for authentication.
            // TODO(mikelehen): We really should just use dispatchIfNotClosed
            // and let this dispatch onto the queue, but that opened a spec test can
            // of worms that I don't want to deal with in this PR.
            this.Vo === e && 
            // Normally we'd have to schedule the callback on the AsyncQueue.
            // However, the following calls are safe to be called outside the
            // AsyncQueue since they don't chain asynchronous calls
            this.qo(t, n);
        }), (e => {
            t((() => {
                const t = new j(Q.UNKNOWN, "Fetching auth token failed: " + e.message);
                return this.Ko(t);
            }));
        }));
    }
    qo(t, e) {
        const n = this.Uo(this.Vo);
        this.stream = this.Go(t, e), this.stream.Hr((() => {
            n((() => (this.state = 2 /* Open */ , this.So = this.Yn.enqueueAfterDelay(this.Po, 1e4, (() => (this.xo() && (this.state = 3 /* Healthy */), 
            Promise.resolve()))), this.listener.Hr())));
        })), this.stream.Yr((t => {
            n((() => this.Ko(t)));
        })), this.stream.onMessage((t => {
            n((() => this.onMessage(t)));
        }));
    }
    No() {
        this.state = 5 /* Backoff */ , this.Do.To((async () => {
            this.state = 0 /* Initial */ , this.start();
        }));
    }
    // Visible for tests
    Ko(t) {
        // In theory the stream could close cleanly, however, in our current model
        // we never expect this to happen because if we stop a stream ourselves,
        // this callback will never be called. To prevent cases where we retry
        // without a backoff accidentally, we set the stream to error in all cases.
        return F("PersistentStream", `close with error: ${t}`), this.stream = null, this.close(4 /* Error */ , t);
    }
    /**
     * Returns a "dispatcher" function that dispatches operations onto the
     * AsyncQueue but only runs them if closeCount remains unchanged. This allows
     * us to turn auth / stream callbacks into no-ops if the stream is closed /
     * re-opened, etc.
     */    Uo(t) {
        return e => {
            this.Yn.enqueueAndForget((() => this.Vo === t ? e() : (F("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."), 
            Promise.resolve())));
        };
    }
}

/**
 * A PersistentStream that implements the Listen RPC.
 *
 * Once the Listen stream has called the onOpen() listener, any number of
 * listen() and unlisten() calls can be made to control what changes will be
 * sent from the server for ListenResponses.
 */ class Xo extends Yo {
    constructor(t, e, n, s, i, r) {
        super(t, "listen_stream_connection_backoff" /* ListenStreamConnectionBackoff */ , "listen_stream_idle" /* ListenStreamIdle */ , "health_check_timeout" /* HealthCheckTimeout */ , e, n, s, r), 
        this.M = i;
    }
    Go(t, e) {
        return this.bo.lo("Listen", t, e);
    }
    onMessage(t) {
        // A successful response means the stream is healthy
        this.Do.reset();
        const e = Ds(this.M, t), n = function(t) {
            // We have only reached a consistent snapshot for the entire stream if there
            // is a read_time set and it applies to all targets (i.e. the list of
            // targets is empty). The backend is guaranteed to send such responses.
            if (!("targetChange" in t)) return ht.min();
            const e = t.targetChange;
            return e.targetIds && e.targetIds.length ? ht.min() : e.readTime ? ys(e.readTime) : ht.min();
        }(t);
        return this.listener.Qo(e, n);
    }
    /**
     * Registers interest in the results of the given target. If the target
     * includes a resumeToken it will be included in the request. Results that
     * affect the target will be streamed back as WatchChange messages that
     * reference the targetId.
     */    jo(t) {
        const e = {};
        e.database = Ps(this.M), e.addTarget = function(t, e) {
            let n;
            const s = e.target;
            return n = pe(s) ? {
                documents: ks(t, s)
            } : {
                query: Ms(t, s)
            }, n.targetId = e.targetId, e.resumeToken.approximateByteSize() > 0 ? n.resumeToken = ms(t, e.resumeToken) : e.snapshotVersion.compareTo(ht.min()) > 0 && (
            // TODO(wuandy): Consider removing above check because it is most likely true.
            // Right now, many tests depend on this behaviour though (leaving min() out
            // of serialization).
            n.readTime = ws(t, e.snapshotVersion.toTimestamp())), n;
        }(this.M, t);
        const n = Fs(this.M, t);
        n && (e.labels = n), this.Fo(e);
    }
    /**
     * Unregisters interest in the results of the target associated with the
     * given targetId.
     */    Wo(t) {
        const e = {};
        e.database = Ps(this.M), e.removeTarget = t, this.Fo(e);
    }
}

/**
 * A Stream that implements the Write RPC.
 *
 * The Write RPC requires the caller to maintain special streamToken
 * state in between calls, to help the server understand which responses the
 * client has processed by the time the next request is made. Every response
 * will contain a streamToken; this value must be passed to the next
 * request.
 *
 * After calling start() on this stream, the next request must be a handshake,
 * containing whatever streamToken is on hand. Once a response to this
 * request is received, all pending mutations may be submitted. When
 * submitting multiple batches of mutations at the same time, it's
 * okay to use the same streamToken for the calls to writeMutations.
 *
 * TODO(b/33271235): Use proto types
 */ class Zo extends Yo {
    constructor(t, e, n, s, i, r) {
        super(t, "write_stream_connection_backoff" /* WriteStreamConnectionBackoff */ , "write_stream_idle" /* WriteStreamIdle */ , "health_check_timeout" /* HealthCheckTimeout */ , e, n, s, r), 
        this.M = i, this.zo = !1;
    }
    /**
     * Tracks whether or not a handshake has been successfully exchanged and
     * the stream is ready to accept mutations.
     */    get Ho() {
        return this.zo;
    }
    // Override of PersistentStream.start
    start() {
        this.zo = !1, this.lastStreamToken = void 0, super.start();
    }
    Lo() {
        this.zo && this.Jo([]);
    }
    Go(t, e) {
        return this.bo.lo("Write", t, e);
    }
    onMessage(t) {
        if (
        // Always capture the last stream token.
        q(!!t.streamToken), this.lastStreamToken = t.streamToken, this.zo) {
            // A successful first write response means the stream is healthy,
            // Note, that we could consider a successful handshake healthy, however,
            // the write itself might be causing an error we want to back off from.
            this.Do.reset();
            const e = Ns(t.writeResults, t.commitTime), n = ys(t.commitTime);
            return this.listener.Yo(n, e);
        }
        // The first response is always the handshake response
        return q(!t.writeResults || 0 === t.writeResults.length), this.zo = !0, this.listener.Xo();
    }
    /**
     * Sends an initial streamToken to the server, performing the handshake
     * required to make the StreamingWrite RPC work. Subsequent
     * calls should wait until onHandshakeComplete was called.
     */    Zo() {
        // TODO(dimond): Support stream resumption. We intentionally do not set the
        // stream token on the handshake, ignoring any stream token we might have.
        const t = {};
        t.database = Ps(this.M), this.Fo(t);
    }
    /** Sends a group of mutations to the Firestore backend to apply. */    Jo(t) {
        const e = {
            streamToken: this.lastStreamToken,
            writes: t.map((t => Cs(this.M, t)))
        };
        this.Fo(e);
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Datastore and its related methods are a wrapper around the external Google
 * Cloud Datastore grpc API, which provides an interface that is more convenient
 * for the rest of the client SDK architecture to consume.
 */
/**
 * An implementation of Datastore that exposes additional state for internal
 * consumption.
 */
class tu extends class {} {
    constructor(t, e, n, s) {
        super(), this.authCredentials = t, this.appCheckCredentials = e, this.bo = n, this.M = s, 
        this.tu = !1;
    }
    eu() {
        if (this.tu) throw new j(Q.FAILED_PRECONDITION, "The client has already been terminated.");
    }
    /** Invokes the provided RPC with auth and AppCheck tokens. */    oo(t, e, n) {
        return this.eu(), Promise.all([ this.authCredentials.getToken(), this.appCheckCredentials.getToken() ]).then((([s, i]) => this.bo.oo(t, e, n, s, i))).catch((t => {
            throw "FirebaseError" === t.name ? (t.code === Q.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), 
            this.appCheckCredentials.invalidateToken()), t) : new j(Q.UNKNOWN, t.toString());
        }));
    }
    /** Invokes the provided RPC with streamed results with auth and AppCheck tokens. */    ho(t, e, n) {
        return this.eu(), Promise.all([ this.authCredentials.getToken(), this.appCheckCredentials.getToken() ]).then((([s, i]) => this.bo.ho(t, e, n, s, i))).catch((t => {
            throw "FirebaseError" === t.name ? (t.code === Q.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), 
            this.appCheckCredentials.invalidateToken()), t) : new j(Q.UNKNOWN, t.toString());
        }));
    }
    terminate() {
        this.tu = !0;
    }
}

// TODO(firestorexp): Make sure there is only one Datastore instance per
// firestore-exp client.
/**
 * A component used by the RemoteStore to track the OnlineState (that is,
 * whether or not the client as a whole should be considered to be online or
 * offline), implementing the appropriate heuristics.
 *
 * In particular, when the client is trying to connect to the backend, we
 * allow up to MAX_WATCH_STREAM_FAILURES within ONLINE_STATE_TIMEOUT_MS for
 * a connection to succeed. If we have too many failures or the timeout elapses,
 * then we set the OnlineState to Offline, and the client will behave as if
 * it is offline (get()s will return cached data, etc.).
 */
class eu {
    constructor(t, e) {
        this.asyncQueue = t, this.onlineStateHandler = e, 
        /** The current OnlineState. */
        this.state = "Unknown" /* Unknown */ , 
        /**
         * A count of consecutive failures to open the stream. If it reaches the
         * maximum defined by MAX_WATCH_STREAM_FAILURES, we'll set the OnlineState to
         * Offline.
         */
        this.nu = 0, 
        /**
         * A timer that elapses after ONLINE_STATE_TIMEOUT_MS, at which point we
         * transition from OnlineState.Unknown to OnlineState.Offline without waiting
         * for the stream to actually fail (MAX_WATCH_STREAM_FAILURES times).
         */
        this.su = null, 
        /**
         * Whether the client should log a warning message if it fails to connect to
         * the backend (initially true, cleared after a successful stream, or if we've
         * logged the message already).
         */
        this.iu = !0;
    }
    /**
     * Called by RemoteStore when a watch stream is started (including on each
     * backoff attempt).
     *
     * If this is the first attempt, it sets the OnlineState to Unknown and starts
     * the onlineStateTimer.
     */    ru() {
        0 === this.nu && (this.ou("Unknown" /* Unknown */), this.su = this.asyncQueue.enqueueAfterDelay("online_state_timeout" /* OnlineStateTimeout */ , 1e4, (() => (this.su = null, 
        this.uu("Backend didn't respond within 10 seconds."), this.ou("Offline" /* Offline */), 
        Promise.resolve()))));
    }
    /**
     * Updates our OnlineState as appropriate after the watch stream reports a
     * failure. The first failure moves us to the 'Unknown' state. We then may
     * allow multiple failures (based on MAX_WATCH_STREAM_FAILURES) before we
     * actually transition to the 'Offline' state.
     */    au(t) {
        "Online" /* Online */ === this.state ? this.ou("Unknown" /* Unknown */) : (this.nu++, 
        this.nu >= 1 && (this.cu(), this.uu(`Connection failed 1 times. Most recent error: ${t.toString()}`), 
        this.ou("Offline" /* Offline */)));
    }
    /**
     * Explicitly sets the OnlineState to the specified state.
     *
     * Note that this resets our timers / failure counters, etc. used by our
     * Offline heuristics, so must not be used in place of
     * handleWatchStreamStart() and handleWatchStreamFailure().
     */    set(t) {
        this.cu(), this.nu = 0, "Online" /* Online */ === t && (
        // We've connected to watch at least once. Don't warn the developer
        // about being offline going forward.
        this.iu = !1), this.ou(t);
    }
    ou(t) {
        t !== this.state && (this.state = t, this.onlineStateHandler(t));
    }
    uu(t) {
        const e = `Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
        this.iu ? ($(e), this.iu = !1) : F("OnlineStateTracker", e);
    }
    cu() {
        null !== this.su && (this.su.cancel(), this.su = null);
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class nu {
    constructor(
    /**
     * The local store, used to fill the write pipeline with outbound mutations.
     */
    t, 
    /** The client-side proxy for interacting with the backend. */
    e, n, s, i) {
        this.localStore = t, this.datastore = e, this.asyncQueue = n, this.remoteSyncer = {}, 
        /**
         * A list of up to MAX_PENDING_WRITES writes that we have fetched from the
         * LocalStore via fillWritePipeline() and have or will send to the write
         * stream.
         *
         * Whenever writePipeline.length > 0 the RemoteStore will attempt to start or
         * restart the write stream. When the stream is established the writes in the
         * pipeline will be sent in order.
         *
         * Writes remain in writePipeline until they are acknowledged by the backend
         * and thus will automatically be re-sent if the stream is interrupted /
         * restarted before they're acknowledged.
         *
         * Write responses from the backend are linked to their originating request
         * purely based on order, and so we can just shift() writes from the front of
         * the writePipeline as we receive responses.
         */
        this.hu = [], 
        /**
         * A mapping of watched targets that the client cares about tracking and the
         * user has explicitly called a 'listen' for this target.
         *
         * These targets may or may not have been sent to or acknowledged by the
         * server. On re-establishing the listen stream, these targets should be sent
         * to the server. The targets removed with unlistens are removed eagerly
         * without waiting for confirmation from the listen stream.
         */
        this.lu = new Map, 
        /**
         * A set of reasons for why the RemoteStore may be offline. If empty, the
         * RemoteStore may start its network connections.
         */
        this.fu = new Set, 
        /**
         * Event handlers that get called when the network is disabled or enabled.
         *
         * PORTING NOTE: These functions are used on the Web client to create the
         * underlying streams (to support tree-shakeable streams). On Android and iOS,
         * the streams are created during construction of RemoteStore.
         */
        this.du = [], this._u = i, this._u.Lr((t => {
            n.enqueueAndForget((async () => {
                // Porting Note: Unlike iOS, `restartNetwork()` is called even when the
                // network becomes unreachable as we don't have any other way to tear
                // down our streams.
                lu(this) && (F("RemoteStore", "Restarting streams for network reachability change."), 
                await async function(t) {
                    const e = G(t);
                    e.fu.add(4 /* ConnectivityChange */), await iu(e), e.wu.set("Unknown" /* Unknown */), 
                    e.fu.delete(4 /* ConnectivityChange */), await su(e);
                }(this));
            }));
        })), this.wu = new eu(n, s);
    }
}

async function su(t) {
    if (lu(t)) for (const e of t.du) await e(/* enabled= */ !0);
}

/**
 * Temporarily disables the network. The network can be re-enabled using
 * enableNetwork().
 */ async function iu(t) {
    for (const e of t.du) await e(/* enabled= */ !1);
}

/**
 * Starts new listen for the given target. Uses resume token if provided. It
 * is a no-op if the target of given `TargetData` is already being listened to.
 */
function ru(t, e) {
    const n = G(t);
    n.lu.has(e.targetId) || (
    // Mark this as something the client is currently listening for.
    n.lu.set(e.targetId, e), hu(n) ? 
    // The listen will be sent in onWatchStreamOpen
    cu(n) : Su(n).xo() && uu(n, e));
}

/**
 * Removes the listen from server. It is a no-op if the given target id is
 * not being listened to.
 */ function ou(t, e) {
    const n = G(t), s = Su(n);
    n.lu.delete(e), s.xo() && au(n, e), 0 === n.lu.size && (s.xo() ? s.Mo() : lu(n) && 
    // Revert to OnlineState.Unknown if the watch stream is not open and we
    // have no listeners, since without any listens to send we cannot
    // confirm if the stream is healthy and upgrade to OnlineState.Online.
    n.wu.set("Unknown" /* Unknown */));
}

/**
 * We need to increment the the expected number of pending responses we're due
 * from watch so we wait for the ack to process any messages from this target.
 */ function uu(t, e) {
    t.mu.Z(e.targetId), Su(t).jo(e);
}

/**
 * We need to increment the expected number of pending responses we're due
 * from watch so we wait for the removal on the server before we process any
 * messages from this target.
 */ function au(t, e) {
    t.mu.Z(e), Su(t).Wo(e);
}

function cu(t) {
    t.mu = new cs({
        getRemoteKeysForTarget: e => t.remoteSyncer.getRemoteKeysForTarget(e),
        Et: e => t.lu.get(e) || null
    }), Su(t).start(), t.wu.ru();
}

/**
 * Returns whether the watch stream should be started because it's necessary
 * and has not yet been started.
 */ function hu(t) {
    return lu(t) && !Su(t).Co() && t.lu.size > 0;
}

function lu(t) {
    return 0 === G(t).fu.size;
}

function fu(t) {
    t.mu = void 0;
}

async function du(t) {
    t.lu.forEach(((e, n) => {
        uu(t, e);
    }));
}

async function _u(t, e) {
    fu(t), 
    // If we still need the watch stream, retry the connection.
    hu(t) ? (t.wu.au(e), cu(t)) : 
    // No need to restart watch stream because there are no active targets.
    // The online state is set to unknown because there is no active attempt
    // at establishing a connection
    t.wu.set("Unknown" /* Unknown */);
}

async function wu(t, e, n) {
    if (
    // Mark the client as online since we got a message from the server
    t.wu.set("Online" /* Online */), e instanceof us && 2 /* Removed */ === e.state && e.cause) 
    // There was an error on a target, don't wait for a consistent snapshot
    // to raise events
    try {
        await 
        /** Handles an error on a target */
        async function(t, e) {
            const n = e.cause;
            for (const s of e.targetIds) 
            // A watched target might have been removed already.
            t.lu.has(s) && (await t.remoteSyncer.rejectListen(s, n), t.lu.delete(s), t.mu.removeTarget(s));
        }
        /**
 * Attempts to fill our write pipeline with writes from the LocalStore.
 *
 * Called internally to bootstrap or refill the write pipeline and by
 * SyncEngine whenever there are new mutations to process.
 *
 * Starts the write stream if necessary.
 */ (t, e);
    } catch (n) {
        F("RemoteStore", "Failed to remove targets %s: %s ", e.targetIds.join(","), n), 
        await mu(t, n);
    } else if (e instanceof rs ? t.mu.ut(e) : e instanceof os ? t.mu._t(e) : t.mu.ht(e), 
    !n.isEqual(ht.min())) try {
        const e = await ao(t.localStore);
        n.compareTo(e) >= 0 && 
        // We have received a target change with a global snapshot if the snapshot
        // version is not equal to SnapshotVersion.min().
        await 
        /**
 * Takes a batch of changes from the Datastore, repackages them as a
 * RemoteEvent, and passes that on to the listener, which is typically the
 * SyncEngine.
 */
        function(t, e) {
            const n = t.mu.yt(e);
            // Update in-memory resume tokens. LocalStore will update the
            // persistent view of these when applying the completed RemoteEvent.
                        return n.targetChanges.forEach(((n, s) => {
                if (n.resumeToken.approximateByteSize() > 0) {
                    const i = t.lu.get(s);
                    // A watched target might have been removed already.
                                        i && t.lu.set(s, i.withResumeToken(n.resumeToken, e));
                }
            })), 
            // Re-establish listens for the targets that have been invalidated by
            // existence filter mismatches.
            n.targetMismatches.forEach((e => {
                const n = t.lu.get(e);
                if (!n) 
                // A watched target might have been removed already.
                return;
                // Clear the resume token for the target, since we're in a known mismatch
                // state.
                                t.lu.set(e, n.withResumeToken(Tt.EMPTY_BYTE_STRING, n.snapshotVersion)), 
                // Cause a hard reset by unwatching and rewatching immediately, but
                // deliberately don't send a resume token so that we get a full update.
                au(t, e);
                // Mark the target we send as being on behalf of an existence filter
                // mismatch, but don't actually retain that in listenTargets. This ensures
                // that we flag the first re-listen this way without impacting future
                // listens of this target (that might happen e.g. on reconnect).
                const s = new Oi(n.target, e, 1 /* ExistenceFilterMismatch */ , n.sequenceNumber);
                uu(t, s);
            })), t.remoteSyncer.applyRemoteEvent(n);
        }(t, n);
    } catch (e) {
        F("RemoteStore", "Failed to raise snapshot:", e), await mu(t, e);
    }
}

/**
 * Recovery logic for IndexedDB errors that takes the network offline until
 * `op` succeeds. Retries are scheduled with backoff using
 * `enqueueRetryable()`. If `op()` is not provided, IndexedDB access is
 * validated via a generic operation.
 *
 * The returned Promise is resolved once the network is disabled and before
 * any retry attempt.
 */ async function mu(t, e, n) {
    if (!bi(e)) throw e;
    t.fu.add(1 /* IndexedDbFailed */), 
    // Disable network and raise offline snapshots
    await iu(t), t.wu.set("Offline" /* Offline */), n || (
    // Use a simple read operation to determine if IndexedDB recovered.
    // Ideally, we would expose a health check directly on SimpleDb, but
    // RemoteStore only has access to persistence through LocalStore.
    n = () => ao(t.localStore)), 
    // Probe IndexedDB periodically and re-enable network
    t.asyncQueue.enqueueRetryable((async () => {
        F("RemoteStore", "Retrying IndexedDB access"), await n(), t.fu.delete(1 /* IndexedDbFailed */), 
        await su(t);
    }));
}

/**
 * Executes `op`. If `op` fails, takes the network offline until `op`
 * succeeds. Returns after the first attempt.
 */ function gu(t, e) {
    return e().catch((n => mu(t, n, e)));
}

async function yu(t) {
    const e = G(t), n = Du(e);
    let s = e.hu.length > 0 ? e.hu[e.hu.length - 1].batchId : -1;
    for (;pu(e); ) try {
        const t = await lo(e.localStore, s);
        if (null === t) {
            0 === e.hu.length && n.Mo();
            break;
        }
        s = t.batchId, Iu(e, t);
    } catch (t) {
        await mu(e, t);
    }
    Tu(e) && Eu(e);
}

/**
 * Returns true if we can add to the write pipeline (i.e. the network is
 * enabled and the write pipeline is not full).
 */ function pu(t) {
    return lu(t) && t.hu.length < 10;
}

/**
 * Queues additional writes to be sent to the write stream, sending them
 * immediately if the write stream is established.
 */ function Iu(t, e) {
    t.hu.push(e);
    const n = Du(t);
    n.xo() && n.Ho && n.Jo(e.mutations);
}

function Tu(t) {
    return lu(t) && !Du(t).Co() && t.hu.length > 0;
}

function Eu(t) {
    Du(t).start();
}

async function Au(t) {
    Du(t).Zo();
}

async function Ru(t) {
    const e = Du(t);
    // Send the write pipeline now that the stream is established.
        for (const n of t.hu) e.Jo(n.mutations);
}

async function Pu(t, e, n) {
    const s = t.hu.shift(), i = ki.from(s, e, n);
    await gu(t, (() => t.remoteSyncer.applySuccessfulWrite(i))), 
    // It's possible that with the completion of this mutation another
    // slot has freed up.
    await yu(t);
}

async function bu(t, e) {
    // If the write stream closed after the write handshake completes, a write
    // operation failed and we fail the pending operation.
    e && Du(t).Ho && 
    // This error affects the actual write.
    await async function(t, e) {
        // Only handle permanent errors here. If it's transient, just let the retry
        // logic kick in.
        if (n = e.code, $n(n) && n !== Q.ABORTED) {
            // This was a permanent error, the request itself was the problem
            // so it's not going to succeed if we resend it.
            const n = t.hu.shift();
            // In this case it's also unlikely that the server itself is melting
            // down -- this was just a bad request so inhibit backoff on the next
            // restart.
                        Du(t).ko(), await gu(t, (() => t.remoteSyncer.rejectFailedWrite(n.batchId, e))), 
            // It's possible that with the completion of this mutation
            // another slot has freed up.
            await yu(t);
        }
        var n;
    }(t, e), 
    // The write stream might have been started by refilling the write
    // pipeline for failed writes
    Tu(t) && Eu(t);
}

async function Vu(t, e) {
    const n = G(t);
    n.asyncQueue.verifyOperationInProgress(), F("RemoteStore", "RemoteStore received new credentials");
    const s = lu(n);
    // Tear down and re-create our network streams. This will ensure we get a
    // fresh auth token for the new user and re-fill the write pipeline with
    // new mutations from the LocalStore (since mutations are per-user).
        n.fu.add(3 /* CredentialChange */), await iu(n), s && 
    // Don't set the network status to Unknown if we are offline.
    n.wu.set("Unknown" /* Unknown */), await n.remoteSyncer.handleCredentialChange(e), 
    n.fu.delete(3 /* CredentialChange */), await su(n);
}

/**
 * Toggles the network state when the client gains or loses its primary lease.
 */ async function vu(t, e) {
    const n = G(t);
    e ? (n.fu.delete(2 /* IsSecondary */), await su(n)) : e || (n.fu.add(2 /* IsSecondary */), 
    await iu(n), n.wu.set("Unknown" /* Unknown */));
}

/**
 * If not yet initialized, registers the WatchStream and its network state
 * callback with `remoteStoreImpl`. Returns the existing stream if one is
 * already available.
 *
 * PORTING NOTE: On iOS and Android, the WatchStream gets registered on startup.
 * This is not done on Web to allow it to be tree-shaken.
 */ function Su(t) {
    return t.gu || (
    // Create stream (but note that it is not started yet).
    t.gu = function(t, e, n) {
        const s = G(t);
        return s.eu(), new Xo(e, s.bo, s.authCredentials, s.appCheckCredentials, s.M, n);
    }
    /**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ (t.datastore, t.asyncQueue, {
        Hr: du.bind(null, t),
        Yr: _u.bind(null, t),
        Qo: wu.bind(null, t)
    }), t.du.push((async e => {
        e ? (t.gu.ko(), hu(t) ? cu(t) : t.wu.set("Unknown" /* Unknown */)) : (await t.gu.stop(), 
        fu(t));
    }))), t.gu;
}

/**
 * If not yet initialized, registers the WriteStream and its network state
 * callback with `remoteStoreImpl`. Returns the existing stream if one is
 * already available.
 *
 * PORTING NOTE: On iOS and Android, the WriteStream gets registered on startup.
 * This is not done on Web to allow it to be tree-shaken.
 */ function Du(t) {
    return t.yu || (
    // Create stream (but note that it is not started yet).
    t.yu = function(t, e, n) {
        const s = G(t);
        return s.eu(), new Zo(e, s.bo, s.authCredentials, s.appCheckCredentials, s.M, n);
    }(t.datastore, t.asyncQueue, {
        Hr: Au.bind(null, t),
        Yr: bu.bind(null, t),
        Xo: Ru.bind(null, t),
        Yo: Pu.bind(null, t)
    }), t.du.push((async e => {
        e ? (t.yu.ko(), 
        // This will start the write stream if necessary.
        await yu(t)) : (await t.yu.stop(), t.hu.length > 0 && (F("RemoteStore", `Stopping write stream with ${t.hu.length} pending writes`), 
        t.hu = []));
    }))), t.yu;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Represents an operation scheduled to be run in the future on an AsyncQueue.
 *
 * It is created via DelayedOperation.createAndSchedule().
 *
 * Supports cancellation (via cancel()) and early execution (via skipDelay()).
 *
 * Note: We implement `PromiseLike` instead of `Promise`, as the `Promise` type
 * in newer versions of TypeScript defines `finally`, which is not available in
 * IE.
 */
class Cu {
    constructor(t, e, n, s, i) {
        this.asyncQueue = t, this.timerId = e, this.targetTimeMs = n, this.op = s, this.removalCallback = i, 
        this.deferred = new W, this.then = this.deferred.promise.then.bind(this.deferred.promise), 
        // It's normal for the deferred promise to be canceled (due to cancellation)
        // and so we attach a dummy catch callback to avoid
        // 'UnhandledPromiseRejectionWarning' log spam.
        this.deferred.promise.catch((t => {}));
    }
    /**
     * Creates and returns a DelayedOperation that has been scheduled to be
     * executed on the provided asyncQueue after the provided delayMs.
     *
     * @param asyncQueue - The queue to schedule the operation on.
     * @param id - A Timer ID identifying the type of operation this is.
     * @param delayMs - The delay (ms) before the operation should be scheduled.
     * @param op - The operation to run.
     * @param removalCallback - A callback to be called synchronously once the
     *   operation is executed or canceled, notifying the AsyncQueue to remove it
     *   from its delayedOperations list.
     *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
     *   the DelayedOperation class public.
     */    static createAndSchedule(t, e, n, s, i) {
        const r = Date.now() + n, o = new Cu(t, e, r, s, i);
        return o.start(n), o;
    }
    /**
     * Starts the timer. This is called immediately after construction by
     * createAndSchedule().
     */    start(t) {
        this.timerHandle = setTimeout((() => this.handleDelayElapsed()), t);
    }
    /**
     * Queues the operation to run immediately (if it hasn't already been run or
     * canceled).
     */    skipDelay() {
        return this.handleDelayElapsed();
    }
    /**
     * Cancels the operation if it hasn't already been executed or canceled. The
     * promise will be rejected.
     *
     * As long as the operation has not yet been run, calling cancel() provides a
     * guarantee that the operation will not be run.
     */    cancel(t) {
        null !== this.timerHandle && (this.clearTimeout(), this.deferred.reject(new j(Q.CANCELLED, "Operation cancelled" + (t ? ": " + t : ""))));
    }
    handleDelayElapsed() {
        this.asyncQueue.enqueueAndForget((() => null !== this.timerHandle ? (this.clearTimeout(), 
        this.op().then((t => this.deferred.resolve(t)))) : Promise.resolve()));
    }
    clearTimeout() {
        null !== this.timerHandle && (this.removalCallback(this), clearTimeout(this.timerHandle), 
        this.timerHandle = null);
    }
}

/**
 * Returns a FirestoreError that can be surfaced to the user if the provided
 * error is an IndexedDbTransactionError. Re-throws the error otherwise.
 */ function xu(t, e) {
    if ($("AsyncQueue", `${e}: ${t}`), bi(t)) return new j(Q.UNAVAILABLE, `${e}: ${t}`);
    throw t;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * DocumentSet is an immutable (copy-on-write) collection that holds documents
 * in order specified by the provided comparator. We always add a document key
 * comparator on top of what is provided to guarantee document equality based on
 * the key.
 */ class Nu {
    /** The default ordering is by key if the comparator is omitted */
    constructor(t) {
        // We are adding document key comparator to the end as it's the only
        // guaranteed unique property of a document.
        this.comparator = t ? (e, n) => t(e, n) || kt.comparator(e.key, n.key) : (t, e) => kt.comparator(t.key, e.key), 
        this.keyedMap = Jn(), this.sortedSet = new Un(this.comparator);
    }
    /**
     * Returns an empty copy of the existing DocumentSet, using the same
     * comparator.
     */    static emptySet(t) {
        return new Nu(t.comparator);
    }
    has(t) {
        return null != this.keyedMap.get(t);
    }
    get(t) {
        return this.keyedMap.get(t);
    }
    first() {
        return this.sortedSet.minKey();
    }
    last() {
        return this.sortedSet.maxKey();
    }
    isEmpty() {
        return this.sortedSet.isEmpty();
    }
    /**
     * Returns the index of the provided key in the document set, or -1 if the
     * document key is not present in the set;
     */    indexOf(t) {
        const e = this.keyedMap.get(t);
        return e ? this.sortedSet.indexOf(e) : -1;
    }
    get size() {
        return this.sortedSet.size;
    }
    /** Iterates documents in order defined by "comparator" */    forEach(t) {
        this.sortedSet.inorderTraversal(((e, n) => (t(e), !1)));
    }
    /** Inserts or updates a document with the same key */    add(t) {
        // First remove the element if we have it.
        const e = this.delete(t.key);
        return e.copy(e.keyedMap.insert(t.key, t), e.sortedSet.insert(t, null));
    }
    /** Deletes a document with a given key */    delete(t) {
        const e = this.get(t);
        return e ? this.copy(this.keyedMap.remove(t), this.sortedSet.remove(e)) : this;
    }
    isEqual(t) {
        if (!(t instanceof Nu)) return !1;
        if (this.size !== t.size) return !1;
        const e = this.sortedSet.getIterator(), n = t.sortedSet.getIterator();
        for (;e.hasNext(); ) {
            const t = e.getNext().key, s = n.getNext().key;
            if (!t.isEqual(s)) return !1;
        }
        return !0;
    }
    toString() {
        const t = [];
        return this.forEach((e => {
            t.push(e.toString());
        })), 0 === t.length ? "DocumentSet ()" : "DocumentSet (\n  " + t.join("  \n") + "\n)";
    }
    copy(t, e) {
        const n = new Nu;
        return n.comparator = this.comparator, n.keyedMap = t, n.sortedSet = e, n;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * DocumentChangeSet keeps track of a set of changes to docs in a query, merging
 * duplicate events for the same doc.
 */ class ku {
    constructor() {
        this.pu = new Un(kt.comparator);
    }
    track(t) {
        const e = t.doc.key, n = this.pu.get(e);
        n ? 
        // Merge the new change with the existing change.
        0 /* Added */ !== t.type && 3 /* Metadata */ === n.type ? this.pu = this.pu.insert(e, t) : 3 /* Metadata */ === t.type && 1 /* Removed */ !== n.type ? this.pu = this.pu.insert(e, {
            type: n.type,
            doc: t.doc
        }) : 2 /* Modified */ === t.type && 2 /* Modified */ === n.type ? this.pu = this.pu.insert(e, {
            type: 2 /* Modified */ ,
            doc: t.doc
        }) : 2 /* Modified */ === t.type && 0 /* Added */ === n.type ? this.pu = this.pu.insert(e, {
            type: 0 /* Added */ ,
            doc: t.doc
        }) : 1 /* Removed */ === t.type && 0 /* Added */ === n.type ? this.pu = this.pu.remove(e) : 1 /* Removed */ === t.type && 2 /* Modified */ === n.type ? this.pu = this.pu.insert(e, {
            type: 1 /* Removed */ ,
            doc: n.doc
        }) : 0 /* Added */ === t.type && 1 /* Removed */ === n.type ? this.pu = this.pu.insert(e, {
            type: 2 /* Modified */ ,
            doc: t.doc
        }) : 
        // This includes these cases, which don't make sense:
        // Added->Added
        // Removed->Removed
        // Modified->Added
        // Removed->Modified
        // Metadata->Added
        // Removed->Metadata
        U() : this.pu = this.pu.insert(e, t);
    }
    Iu() {
        const t = [];
        return this.pu.inorderTraversal(((e, n) => {
            t.push(n);
        })), t;
    }
}

class Mu {
    constructor(t, e, n, s, i, r, o, u) {
        this.query = t, this.docs = e, this.oldDocs = n, this.docChanges = s, this.mutatedKeys = i, 
        this.fromCache = r, this.syncStateChanged = o, this.excludesMetadataChanges = u;
    }
    /** Returns a view snapshot as if all documents in the snapshot were added. */    static fromInitialDocuments(t, e, n, s) {
        const i = [];
        return e.forEach((t => {
            i.push({
                type: 0 /* Added */ ,
                doc: t
            });
        })), new Mu(t, e, Nu.emptySet(e), i, n, s, 
        /* syncStateChanged= */ !0, 
        /* excludesMetadataChanges= */ !1);
    }
    get hasPendingWrites() {
        return !this.mutatedKeys.isEmpty();
    }
    isEqual(t) {
        if (!(this.fromCache === t.fromCache && this.syncStateChanged === t.syncStateChanged && this.mutatedKeys.isEqual(t.mutatedKeys) && ze(this.query, t.query) && this.docs.isEqual(t.docs) && this.oldDocs.isEqual(t.oldDocs))) return !1;
        const e = this.docChanges, n = t.docChanges;
        if (e.length !== n.length) return !1;
        for (let t = 0; t < e.length; t++) if (e[t].type !== n[t].type || !e[t].doc.isEqual(n[t].doc)) return !1;
        return !0;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Holds the listeners and the last received ViewSnapshot for a query being
 * tracked by EventManager.
 */ class Ou {
    constructor() {
        this.Tu = void 0, this.listeners = [];
    }
}

class Fu {
    constructor() {
        this.queries = new Ln((t => He(t)), ze), this.onlineState = "Unknown" /* Unknown */ , 
        this.Eu = new Set;
    }
}

async function $u(t, e) {
    const n = G(t), s = e.query;
    let i = !1, r = n.queries.get(s);
    if (r || (i = !0, r = new Ou), i) try {
        r.Tu = await n.onListen(s);
    } catch (t) {
        const n = xu(t, `Initialization of query '${Je(e.query)}' failed`);
        return void e.onError(n);
    }
    if (n.queries.set(s, r), r.listeners.push(e), 
    // Run global snapshot listeners if a consistent snapshot has been emitted.
    e.Au(n.onlineState), r.Tu) {
        e.Ru(r.Tu) && qu(n);
    }
}

async function Bu(t, e) {
    const n = G(t), s = e.query;
    let i = !1;
    const r = n.queries.get(s);
    if (r) {
        const t = r.listeners.indexOf(e);
        t >= 0 && (r.listeners.splice(t, 1), i = 0 === r.listeners.length);
    }
    if (i) return n.queries.delete(s), n.onUnlisten(s);
}

function Lu(t, e) {
    const n = G(t);
    let s = !1;
    for (const t of e) {
        const e = t.query, i = n.queries.get(e);
        if (i) {
            for (const e of i.listeners) e.Ru(t) && (s = !0);
            i.Tu = t;
        }
    }
    s && qu(n);
}

function Uu(t, e, n) {
    const s = G(t), i = s.queries.get(e);
    if (i) for (const t of i.listeners) t.onError(n);
    // Remove all listeners. NOTE: We don't need to call syncEngine.unlisten()
    // after an error.
        s.queries.delete(e);
}

// Call all global snapshot listeners that have been set.
function qu(t) {
    t.Eu.forEach((t => {
        t.next();
    }));
}

/**
 * QueryListener takes a series of internal view snapshots and determines
 * when to raise the event.
 *
 * It uses an Observer to dispatch events.
 */ class Ku {
    constructor(t, e, n) {
        this.query = t, this.Pu = e, 
        /**
         * Initial snapshots (e.g. from cache) may not be propagated to the wrapped
         * observer. This flag is set to true once we've actually raised an event.
         */
        this.bu = !1, this.Vu = null, this.onlineState = "Unknown" /* Unknown */ , this.options = n || {};
    }
    /**
     * Applies the new ViewSnapshot to this listener, raising a user-facing event
     * if applicable (depending on what changed, whether the user has opted into
     * metadata-only changes, etc.). Returns true if a user-facing event was
     * indeed raised.
     */    Ru(t) {
        if (!this.options.includeMetadataChanges) {
            // Remove the metadata only changes.
            const e = [];
            for (const n of t.docChanges) 3 /* Metadata */ !== n.type && e.push(n);
            t = new Mu(t.query, t.docs, t.oldDocs, e, t.mutatedKeys, t.fromCache, t.syncStateChanged, 
            /* excludesMetadataChanges= */ !0);
        }
        let e = !1;
        return this.bu ? this.vu(t) && (this.Pu.next(t), e = !0) : this.Su(t, this.onlineState) && (this.Du(t), 
        e = !0), this.Vu = t, e;
    }
    onError(t) {
        this.Pu.error(t);
    }
    /** Returns whether a snapshot was raised. */    Au(t) {
        this.onlineState = t;
        let e = !1;
        return this.Vu && !this.bu && this.Su(this.Vu, t) && (this.Du(this.Vu), e = !0), 
        e;
    }
    Su(t, e) {
        // Always raise the first event when we're synced
        if (!t.fromCache) return !0;
        // NOTE: We consider OnlineState.Unknown as online (it should become Offline
        // or Online if we wait long enough).
                const n = "Offline" /* Offline */ !== e;
        // Don't raise the event if we're online, aren't synced yet (checked
        // above) and are waiting for a sync.
                return (!this.options.Cu || !n) && (!t.docs.isEmpty() || "Offline" /* Offline */ === e);
        // Raise data from cache if we have any documents or we are offline
        }
    vu(t) {
        // We don't need to handle includeDocumentMetadataChanges here because
        // the Metadata only changes have already been stripped out if needed.
        // At this point the only changes we will see are the ones we should
        // propagate.
        if (t.docChanges.length > 0) return !0;
        const e = this.Vu && this.Vu.hasPendingWrites !== t.hasPendingWrites;
        return !(!t.syncStateChanged && !e) && !0 === this.options.includeMetadataChanges;
        // Generally we should have hit one of the cases above, but it's possible
        // to get here if there were only metadata docChanges and they got
        // stripped out.
        }
    Du(t) {
        t = Mu.fromInitialDocuments(t.query, t.docs, t.mutatedKeys, t.fromCache), this.bu = !0, 
        this.Pu.next(t);
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A complete element in the bundle stream, together with the byte length it
 * occupies in the stream.
 */ class Gu {
    constructor(t, 
    // How many bytes this element takes to store in the bundle.
    e) {
        this.payload = t, this.byteLength = e;
    }
    xu() {
        return "metadata" in this.payload;
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Helper to convert objects from bundles to model objects in the SDK.
 */ class Qu {
    constructor(t) {
        this.M = t;
    }
    fi(t) {
        return Es(this.M, t);
    }
    /**
     * Converts a BundleDocument to a MutableDocument.
     */    di(t) {
        return t.metadata.exists ? vs(this.M, t.document, !1) : ie.newNoDocument(this.fi(t.metadata.name), this._i(t.metadata.readTime));
    }
    _i(t) {
        return ys(t);
    }
}

/**
 * A class to process the elements from a bundle, load them into local
 * storage and provide progress update while loading.
 */ class ju {
    constructor(t, e, n) {
        this.Nu = t, this.localStore = e, this.M = n, 
        /** Batched queries to be saved into storage */
        this.queries = [], 
        /** Batched documents to be saved into storage */
        this.documents = [], 
        /** The collection groups affected by this bundle. */
        this.collectionGroups = new Set, this.progress = Wu(t);
    }
    /**
     * Adds an element from the bundle to the loader.
     *
     * Returns a new progress if adding the element leads to a new progress,
     * otherwise returns null.
     */    ku(t) {
        this.progress.bytesLoaded += t.byteLength;
        let e = this.progress.documentsLoaded;
        if (t.payload.namedQuery) this.queries.push(t.payload.namedQuery); else if (t.payload.documentMetadata) {
            this.documents.push({
                metadata: t.payload.documentMetadata
            }), t.payload.documentMetadata.exists || ++e;
            const n = wt.fromString(t.payload.documentMetadata.name);
            this.collectionGroups.add(n.get(n.length - 2));
        } else t.payload.document && (this.documents[this.documents.length - 1].document = t.payload.document, 
        ++e);
        return e !== this.progress.documentsLoaded ? (this.progress.documentsLoaded = e, 
        Object.assign({}, this.progress)) : null;
    }
    Mu(t) {
        const e = new Map, n = new Qu(this.M);
        for (const s of t) if (s.metadata.queries) {
            const t = n.fi(s.metadata.name);
            for (const n of s.metadata.queries) {
                const s = (e.get(n) || ts()).add(t);
                e.set(n, s);
            }
        }
        return e;
    }
    /**
     * Update the progress to 'Success' and return the updated progress.
     */    async complete() {
        const t = await po(this.localStore, new Qu(this.M), this.documents, this.Nu.id), e = this.Mu(this.documents);
        for (const t of this.queries) await Io(this.localStore, t, e.get(t.name));
        return this.progress.taskState = "Success", {
            progress: this.progress,
            Ou: this.collectionGroups,
            Fu: t
        };
    }
}

/**
 * Returns a `LoadBundleTaskProgress` representing the initial progress of
 * loading a bundle.
 */ function Wu(t) {
    return {
        taskState: "Running",
        documentsLoaded: 0,
        bytesLoaded: 0,
        totalDocuments: t.totalDocuments,
        totalBytes: t.totalBytes
    };
}

/**
 * Returns a `LoadBundleTaskProgress` representing the progress that the loading
 * has succeeded.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class zu {
    constructor(t) {
        this.key = t;
    }
}

class Hu {
    constructor(t) {
        this.key = t;
    }
}

/**
 * View is responsible for computing the final merged truth of what docs are in
 * a query. It gets notified of local and remote changes to docs, and applies
 * the query filters and limits to determine the most correct possible results.
 */ class Ju {
    constructor(t, 
    /** Documents included in the remote target */
    e) {
        this.query = t, this.$u = e, this.Bu = null, 
        /**
         * A flag whether the view is current with the backend. A view is considered
         * current after it has seen the current flag from the backend and did not
         * lose consistency within the watch stream (e.g. because of an existence
         * filter mismatch).
         */
        this.current = !1, 
        /** Documents in the view but not in the remote target */
        this.Lu = ts(), 
        /** Document Keys that have local changes */
        this.mutatedKeys = ts(), this.Uu = Ze(t), this.qu = new Nu(this.Uu);
    }
    /**
     * The set of remote documents that the server has told us belongs to the target associated with
     * this view.
     */    get Ku() {
        return this.$u;
    }
    /**
     * Iterates over a set of doc changes, applies the query limit, and computes
     * what the new results should be, what the changes were, and whether we may
     * need to go back to the local cache for more results. Does not make any
     * changes to the view.
     * @param docChanges - The doc changes to apply to this view.
     * @param previousChanges - If this is being called with a refill, then start
     *        with this set of docs and changes instead of the current view.
     * @returns a new set of docs, changes, and refill flag.
     */    Gu(t, e) {
        const n = e ? e.Qu : new ku, s = e ? e.qu : this.qu;
        let i = e ? e.mutatedKeys : this.mutatedKeys, r = s, o = !1;
        // Track the last doc in a (full) limit. This is necessary, because some
        // update (a delete, or an update moving a doc past the old limit) might
        // mean there is some other document in the local cache that either should
        // come (1) between the old last limit doc and the new last document, in the
        // case of updates, or (2) after the new last document, in the case of
        // deletes. So we keep this doc at the old limit to compare the updates to.
        // Note that this should never get used in a refill (when previousChanges is
        // set), because there will only be adds -- no deletes or updates.
        const u = Le(this.query) && s.size === this.query.limit ? s.last() : null, a = Ue(this.query) && s.size === this.query.limit ? s.first() : null;
        // Drop documents out to meet limit/limitToLast requirement.
        if (t.inorderTraversal(((t, e) => {
            const c = s.get(t), h = Ye(this.query, e) ? e : null, l = !!c && this.mutatedKeys.has(c.key), f = !!h && (h.hasLocalMutations || 
            // We only consider committed mutations for documents that were
            // mutated during the lifetime of the view.
            this.mutatedKeys.has(h.key) && h.hasCommittedMutations);
            let d = !1;
            // Calculate change
                        if (c && h) {
                c.data.isEqual(h.data) ? l !== f && (n.track({
                    type: 3 /* Metadata */ ,
                    doc: h
                }), d = !0) : this.ju(c, h) || (n.track({
                    type: 2 /* Modified */ ,
                    doc: h
                }), d = !0, (u && this.Uu(h, u) > 0 || a && this.Uu(h, a) < 0) && (
                // This doc moved from inside the limit to outside the limit.
                // That means there may be some other doc in the local cache
                // that should be included instead.
                o = !0));
            } else !c && h ? (n.track({
                type: 0 /* Added */ ,
                doc: h
            }), d = !0) : c && !h && (n.track({
                type: 1 /* Removed */ ,
                doc: c
            }), d = !0, (u || a) && (
            // A doc was removed from a full limit query. We'll need to
            // requery from the local cache to see if we know about some other
            // doc that should be in the results.
            o = !0));
            d && (h ? (r = r.add(h), i = f ? i.add(t) : i.delete(t)) : (r = r.delete(t), i = i.delete(t)));
        })), Le(this.query) || Ue(this.query)) for (;r.size > this.query.limit; ) {
            const t = Le(this.query) ? r.last() : r.first();
            r = r.delete(t.key), i = i.delete(t.key), n.track({
                type: 1 /* Removed */ ,
                doc: t
            });
        }
        return {
            qu: r,
            Qu: n,
            ni: o,
            mutatedKeys: i
        };
    }
    ju(t, e) {
        // We suppress the initial change event for documents that were modified as
        // part of a write acknowledgment (e.g. when the value of a server transform
        // is applied) as Watch will send us the same document again.
        // By suppressing the event, we only raise two user visible events (one with
        // `hasPendingWrites` and the final state of the document) instead of three
        // (one with `hasPendingWrites`, the modified document with
        // `hasPendingWrites` and the final state of the document).
        return t.hasLocalMutations && e.hasCommittedMutations && !e.hasLocalMutations;
    }
    /**
     * Updates the view with the given ViewDocumentChanges and optionally updates
     * limbo docs and sync state from the provided target change.
     * @param docChanges - The set of changes to make to the view's docs.
     * @param updateLimboDocuments - Whether to update limbo documents based on
     *        this change.
     * @param targetChange - A target change to apply for computing limbo docs and
     *        sync state.
     * @returns A new ViewChange with the given docs, changes, and sync state.
     */
    // PORTING NOTE: The iOS/Android clients always compute limbo document changes.
    applyChanges(t, e, n) {
        const s = this.qu;
        this.qu = t.qu, this.mutatedKeys = t.mutatedKeys;
        // Sort changes based on type and query comparator
        const i = t.Qu.Iu();
        i.sort(((t, e) => function(t, e) {
            const n = t => {
                switch (t) {
                  case 0 /* Added */ :
                    return 1;

                  case 2 /* Modified */ :
                  case 3 /* Metadata */ :
                    // A metadata change is converted to a modified change at the public
                    // api layer.  Since we sort by document key and then change type,
                    // metadata and modified changes must be sorted equivalently.
                    return 2;

                  case 1 /* Removed */ :
                    return 0;

                  default:
                    return U();
                }
            };
            return n(t) - n(e);
        }
        /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ (t.type, e.type) || this.Uu(t.doc, e.doc))), this.Wu(n);
        const r = e ? this.zu() : [], o = 0 === this.Lu.size && this.current ? 1 /* Synced */ : 0 /* Local */ , u = o !== this.Bu;
        if (this.Bu = o, 0 !== i.length || u) {
            return {
                snapshot: new Mu(this.query, t.qu, s, i, t.mutatedKeys, 0 /* Local */ === o, u, 
                /* excludesMetadataChanges= */ !1),
                Hu: r
            };
        }
        // no changes
        return {
            Hu: r
        };
    }
    /**
     * Applies an OnlineState change to the view, potentially generating a
     * ViewChange if the view's syncState changes as a result.
     */    Au(t) {
        return this.current && "Offline" /* Offline */ === t ? (
        // If we're offline, set `current` to false and then call applyChanges()
        // to refresh our syncState and generate a ViewChange as appropriate. We
        // are guaranteed to get a new TargetChange that sets `current` back to
        // true once the client is back online.
        this.current = !1, this.applyChanges({
            qu: this.qu,
            Qu: new ku,
            mutatedKeys: this.mutatedKeys,
            ni: !1
        }, 
        /* updateLimboDocuments= */ !1)) : {
            Hu: []
        };
    }
    /**
     * Returns whether the doc for the given key should be in limbo.
     */    Ju(t) {
        // If the remote end says it's part of this query, it's not in limbo.
        return !this.$u.has(t) && (
        // The local store doesn't think it's a result, so it shouldn't be in limbo.
        !!this.qu.has(t) && !this.qu.get(t).hasLocalMutations);
    }
    /**
     * Updates syncedDocuments, current, and limbo docs based on the given change.
     * Returns the list of changes to which docs are in limbo.
     */    Wu(t) {
        t && (t.addedDocuments.forEach((t => this.$u = this.$u.add(t))), t.modifiedDocuments.forEach((t => {})), 
        t.removedDocuments.forEach((t => this.$u = this.$u.delete(t))), this.current = t.current);
    }
    zu() {
        // We can only determine limbo documents when we're in-sync with the server.
        if (!this.current) return [];
        // TODO(klimt): Do this incrementally so that it's not quadratic when
        // updating many documents.
                const t = this.Lu;
        this.Lu = ts(), this.qu.forEach((t => {
            this.Ju(t.key) && (this.Lu = this.Lu.add(t.key));
        }));
        // Diff the new limbo docs with the old limbo docs.
        const e = [];
        return t.forEach((t => {
            this.Lu.has(t) || e.push(new Hu(t));
        })), this.Lu.forEach((n => {
            t.has(n) || e.push(new zu(n));
        })), e;
    }
    /**
     * Update the in-memory state of the current view with the state read from
     * persistence.
     *
     * We update the query view whenever a client's primary status changes:
     * - When a client transitions from primary to secondary, it can miss
     *   LocalStorage updates and its query views may temporarily not be
     *   synchronized with the state on disk.
     * - For secondary to primary transitions, the client needs to update the list
     *   of `syncedDocuments` since secondary clients update their query views
     *   based purely on synthesized RemoteEvents.
     *
     * @param queryResult.documents - The documents that match the query according
     * to the LocalStore.
     * @param queryResult.remoteKeys - The keys of the documents that match the
     * query according to the backend.
     *
     * @returns The ViewChange that resulted from this synchronization.
     */
    // PORTING NOTE: Multi-tab only.
    Yu(t) {
        this.$u = t.li, this.Lu = ts();
        const e = this.Gu(t.documents);
        return this.applyChanges(e, /*updateLimboDocuments=*/ !0);
    }
    /**
     * Returns a view snapshot as if this query was just listened to. Contains
     * a document add for every existing document and the `fromCache` and
     * `hasPendingWrites` status of the already established view.
     */
    // PORTING NOTE: Multi-tab only.
    Xu() {
        return Mu.fromInitialDocuments(this.query, this.qu, this.mutatedKeys, 0 /* Local */ === this.Bu);
    }
}

/**
 * QueryView contains all of the data that SyncEngine needs to keep track of for
 * a particular query.
 */
class Yu {
    constructor(
    /**
     * The query itself.
     */
    t, 
    /**
     * The target number created by the client that is used in the watch
     * stream to identify this query.
     */
    e, 
    /**
     * The view is responsible for computing the final merged truth of what
     * docs are in the query. It gets notified of local and remote changes,
     * and applies the query filters and limits to determine the most correct
     * possible results.
     */
    n) {
        this.query = t, this.targetId = e, this.view = n;
    }
}

/** Tracks a limbo resolution. */ class Xu {
    constructor(t) {
        this.key = t, 
        /**
         * Set to true once we've received a document. This is used in
         * getRemoteKeysForTarget() and ultimately used by WatchChangeAggregator to
         * decide whether it needs to manufacture a delete event for the target once
         * the target is CURRENT.
         */
        this.Zu = !1;
    }
}

/**
 * An implementation of `SyncEngine` coordinating with other parts of SDK.
 *
 * The parts of SyncEngine that act as a callback to RemoteStore need to be
 * registered individually. This is done in `syncEngineWrite()` and
 * `syncEngineListen()` (as well as `applyPrimaryState()`) as these methods
 * serve as entry points to RemoteStore's functionality.
 *
 * Note: some field defined in this class might have public access level, but
 * the class is not exported so they are only accessible from this module.
 * This is useful to implement optional features (like bundles) in free
 * functions, such that they are tree-shakeable.
 */ class Zu {
    constructor(t, e, n, 
    // PORTING NOTE: Manages state synchronization in multi-tab environments.
    s, i, r) {
        this.localStore = t, this.remoteStore = e, this.eventManager = n, this.sharedClientState = s, 
        this.currentUser = i, this.maxConcurrentLimboResolutions = r, this.ta = {}, this.ea = new Ln((t => He(t)), ze), 
        this.na = new Map, 
        /**
         * The keys of documents that are in limbo for which we haven't yet started a
         * limbo resolution query. The strings in this set are the result of calling
         * `key.path.canonicalString()` where `key` is a `DocumentKey` object.
         *
         * The `Set` type was chosen because it provides efficient lookup and removal
         * of arbitrary elements and it also maintains insertion order, providing the
         * desired queue-like FIFO semantics.
         */
        this.sa = new Set, 
        /**
         * Keeps track of the target ID for each document that is in limbo with an
         * active target.
         */
        this.ia = new Un(kt.comparator), 
        /**
         * Keeps track of the information about an active limbo resolution for each
         * active target ID that was started for the purpose of limbo resolution.
         */
        this.ra = new Map, this.oa = new Ao, 
        /** Stores user completion handlers, indexed by User and BatchId. */
        this.ua = {}, 
        /** Stores user callbacks waiting for all pending writes to be acknowledged. */
        this.aa = new Map, this.ca = vr.yn(), this.onlineState = "Unknown" /* Unknown */ , 
        // The primary state is set to `true` or `false` immediately after Firestore
        // startup. In the interim, a client should only be considered primary if
        // `isPrimary` is true.
        this.ha = void 0;
    }
    get isPrimaryClient() {
        return !0 === this.ha;
    }
}

/**
 * Initiates the new listen, resolves promise when listen enqueued to the
 * server. All the subsequent view snapshots or errors are sent to the
 * subscribed handlers. Returns the initial snapshot.
 */
async function ta(t, e) {
    const n = Sa(t);
    let s, i;
    const r = n.ea.get(e);
    if (r) 
    // PORTING NOTE: With Multi-Tab Web, it is possible that a query view
    // already exists when EventManager calls us for the first time. This
    // happens when the primary tab is already listening to this query on
    // behalf of another tab and the user of the primary also starts listening
    // to the query. EventManager will not have an assigned target ID in this
    // case and calls `listen` to obtain this ID.
    s = r.targetId, n.sharedClientState.addLocalQueryTarget(s), i = r.view.Xu(); else {
        const t = await fo(n.localStore, je(e));
        n.isPrimaryClient && ru(n.remoteStore, t);
        const r = n.sharedClientState.addLocalQueryTarget(t.targetId);
        s = t.targetId, i = await ea(n, e, s, "current" === r);
    }
    return i;
}

/**
 * Registers a view for a previously unknown query and computes its initial
 * snapshot.
 */ async function ea(t, e, n, s) {
    // PORTING NOTE: On Web only, we inject the code that registers new Limbo
    // targets based on view changes. This allows us to only depend on Limbo
    // changes when user code includes queries.
    t.la = (e, n, s) => async function(t, e, n, s) {
        let i = e.view.Gu(n);
        i.ni && (
        // The query has a limit and some docs were removed, so we need
        // to re-run the query against the local store to make sure we
        // didn't lose any good docs that had been past the limit.
        i = await wo(t.localStore, e.query, 
        /* usePreviousResults= */ !1).then((({documents: t}) => e.view.Gu(t, i))));
        const r = s && s.targetChanges.get(e.targetId), o = e.view.applyChanges(i, 
        /* updateLimboDocuments= */ t.isPrimaryClient, r);
        return _a(t, e.targetId, o.Hu), o.snapshot;
    }(t, e, n, s);
    const i = await wo(t.localStore, e, 
    /* usePreviousResults= */ !0), r = new Ju(e, i.li), o = r.Gu(i.documents), u = is.createSynthesizedTargetChangeForCurrentChange(n, s && "Offline" /* Offline */ !== t.onlineState), a = r.applyChanges(o, 
    /* updateLimboDocuments= */ t.isPrimaryClient, u);
    _a(t, n, a.Hu);
    const c = new Yu(e, n, r);
    return t.ea.set(e, c), t.na.has(n) ? t.na.get(n).push(e) : t.na.set(n, [ e ]), a.snapshot;
}

/** Stops listening to the query. */ async function na(t, e) {
    const n = G(t), s = n.ea.get(e), i = n.na.get(s.targetId);
    if (i.length > 1) return n.na.set(s.targetId, i.filter((t => !ze(t, e)))), void n.ea.delete(e);
    // No other queries are mapped to the target, clean up the query and the target.
        if (n.isPrimaryClient) {
        // We need to remove the local query target first to allow us to verify
        // whether any other client is still interested in this target.
        n.sharedClientState.removeLocalQueryTarget(s.targetId);
        n.sharedClientState.isActiveQueryTarget(s.targetId) || await _o(n.localStore, s.targetId, 
        /*keepPersistedTargetData=*/ !1).then((() => {
            n.sharedClientState.clearQueryState(s.targetId), ou(n.remoteStore, s.targetId), 
            fa(n, s.targetId);
        })).catch(Nr);
    } else fa(n, s.targetId), await _o(n.localStore, s.targetId, 
    /*keepPersistedTargetData=*/ !0);
}

/**
 * Initiates the write of local mutation batch which involves adding the
 * writes to the mutation queue, notifying the remote store about new
 * mutations and raising events for any changes this write caused.
 *
 * The promise returned by this call is resolved when the above steps
 * have completed, *not* when the write was acked by the backend. The
 * userCallback is resolved once the write was acked/rejected by the
 * backend (or failed locally for any other reason).
 */ async function sa(t, e, n) {
    const s = Da(t);
    try {
        const t = await function(t, e) {
            const n = G(t), s = ct.now(), i = e.reduce(((t, e) => t.add(e.key)), ts());
            let r;
            return n.persistence.runTransaction("Locally write mutations", "readwrite", (t => n.ci.Ks(t, i).next((i => {
                r = i;
                // For non-idempotent mutations (such as `FieldValue.increment()`),
                // we record the base state in a separate patch mutation. This is
                // later used to guarantee consistent values and prevents flicker
                // even if the backend sends us an update that already includes our
                // transform.
                const o = [];
                for (const t of e) {
                    const e = Pn(t, r.get(t.key));
                    null != e && 
                    // NOTE: The base state should only be applied if there's some
                    // existing document to override, so use a Precondition of
                    // exists=true
                    o.push(new Sn(t.key, e, se(e.value.mapValue), In.exists(!0)));
                }
                return n.Bs.addMutationBatch(t, s, o, e);
            })))).then((t => (t.applyToLocalDocumentSet(r), {
                batchId: t.batchId,
                changes: r
            })));
        }(s.localStore, e);
        s.sharedClientState.addPendingMutation(t.batchId), function(t, e, n) {
            let s = t.ua[t.currentUser.toKey()];
            s || (s = new Un(ot));
            s = s.insert(e, n), t.ua[t.currentUser.toKey()] = s;
        }
        /**
 * Resolves or rejects the user callback for the given batch and then discards
 * it.
 */ (s, t.batchId, n), await ga(s, t.changes), await yu(s.remoteStore);
    } catch (t) {
        // If we can't persist the mutation, we reject the user callback and
        // don't send the mutation. The user can then retry the write.
        const e = xu(t, "Failed to persist write");
        n.reject(e);
    }
}

/**
 * Applies one remote event to the sync engine, notifying any views of the
 * changes, and releasing any pending mutation batches that would become
 * visible because of the snapshot version the remote event contains.
 */ async function ia(t, e) {
    const n = G(t);
    try {
        const t = await co(n.localStore, e);
        // Update `receivedDocument` as appropriate for any limbo targets.
                e.targetChanges.forEach(((t, e) => {
            const s = n.ra.get(e);
            s && (
            // Since this is a limbo resolution lookup, it's for a single document
            // and it could be added, modified, or removed, but not a combination.
            q(t.addedDocuments.size + t.modifiedDocuments.size + t.removedDocuments.size <= 1), 
            t.addedDocuments.size > 0 ? s.Zu = !0 : t.modifiedDocuments.size > 0 ? q(s.Zu) : t.removedDocuments.size > 0 && (q(s.Zu), 
            s.Zu = !1));
        })), await ga(n, t, e);
    } catch (t) {
        await Nr(t);
    }
}

/**
 * Applies an OnlineState change to the sync engine and notifies any views of
 * the change.
 */ function ra(t, e, n) {
    const s = G(t);
    // If we are the secondary client, we explicitly ignore the remote store's
    // online state (the local client may go offline, even though the primary
    // tab remains online) and only apply the primary tab's online state from
    // SharedClientState.
        if (s.isPrimaryClient && 0 /* RemoteStore */ === n || !s.isPrimaryClient && 1 /* SharedClientState */ === n) {
        const t = [];
        s.ea.forEach(((n, s) => {
            const i = s.view.Au(e);
            i.snapshot && t.push(i.snapshot);
        })), function(t, e) {
            const n = G(t);
            n.onlineState = e;
            let s = !1;
            n.queries.forEach(((t, n) => {
                for (const t of n.listeners) 
                // Run global snapshot listeners if a consistent snapshot has been emitted.
                t.Au(e) && (s = !0);
            })), s && qu(n);
        }(s.eventManager, e), t.length && s.ta.Qo(t), s.onlineState = e, s.isPrimaryClient && s.sharedClientState.setOnlineState(e);
    }
}

/**
 * Rejects the listen for the given targetID. This can be triggered by the
 * backend for any active target.
 *
 * @param syncEngine - The sync engine implementation.
 * @param targetId - The targetID corresponds to one previously initiated by the
 * user as part of TargetData passed to listen() on RemoteStore.
 * @param err - A description of the condition that has forced the rejection.
 * Nearly always this will be an indication that the user is no longer
 * authorized to see the data matching the target.
 */ async function oa(t, e, n) {
    const s = G(t);
    // PORTING NOTE: Multi-tab only.
        s.sharedClientState.updateQueryState(e, "rejected", n);
    const i = s.ra.get(e), r = i && i.key;
    if (r) {
        // TODO(klimt): We really only should do the following on permission
        // denied errors, but we don't have the cause code here.
        // It's a limbo doc. Create a synthetic event saying it was deleted.
        // This is kind of a hack. Ideally, we would have a method in the local
        // store to purge a document. However, it would be tricky to keep all of
        // the local store's invariants with another method.
        let t = new Un(kt.comparator);
        // TODO(b/217189216): This limbo document should ideally have a read time,
        // so that it is picked up by any read-time based scans. The backend,
        // however, does not send a read time for target removals.
                t = t.insert(r, ie.newNoDocument(r, ht.min()));
        const n = ts().add(r), i = new ss(ht.min(), 
        /* targetChanges= */ new Map, 
        /* targetMismatches= */ new Gn(ot), t, n);
        await ia(s, i), 
        // Since this query failed, we won't want to manually unlisten to it.
        // We only remove it from bookkeeping after we successfully applied the
        // RemoteEvent. If `applyRemoteEvent()` throws, we want to re-listen to
        // this query when the RemoteStore restarts the Watch stream, which should
        // re-trigger the target failure.
        s.ia = s.ia.remove(r), s.ra.delete(e), ma(s);
    } else await _o(s.localStore, e, 
    /* keepPersistedTargetData */ !1).then((() => fa(s, e, n))).catch(Nr);
}

async function ua(t, e) {
    const n = G(t), s = e.batch.batchId;
    try {
        const t = await uo(n.localStore, e);
        // The local store may or may not be able to apply the write result and
        // raise events immediately (depending on whether the watcher is caught
        // up), so we raise user callbacks first so that they consistently happen
        // before listen events.
                la(n, s, /*error=*/ null), ha(n, s), n.sharedClientState.updateMutationState(s, "acknowledged"), 
        await ga(n, t);
    } catch (t) {
        await Nr(t);
    }
}

async function aa(t, e, n) {
    const s = G(t);
    try {
        const t = await function(t, e) {
            const n = G(t);
            return n.persistence.runTransaction("Reject batch", "readwrite-primary", (t => {
                let s;
                return n.Bs.lookupMutationBatch(t, e).next((e => (q(null !== e), s = e.keys(), n.Bs.removeMutationBatch(t, e)))).next((() => n.Bs.performConsistencyCheck(t))).next((() => n.ci.Ks(t, s)));
            }));
        }
        /**
 * Returns the largest (latest) batch id in mutation queue that is pending
 * server response.
 *
 * Returns `BATCHID_UNKNOWN` if the queue is empty.
 */ (s.localStore, e);
        // The local store may or may not be able to apply the write result and
        // raise events immediately (depending on whether the watcher is caught up),
        // so we raise user callbacks first so that they consistently happen before
        // listen events.
                la(s, e, n), ha(s, e), s.sharedClientState.updateMutationState(e, "rejected", n), 
        await ga(s, t);
    } catch (n) {
        await Nr(n);
    }
}

/**
 * Registers a user callback that resolves when all pending mutations at the moment of calling
 * are acknowledged .
 */ async function ca(t, e) {
    const n = G(t);
    lu(n.remoteStore) || F("SyncEngine", "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");
    try {
        const t = await function(t) {
            const e = G(t);
            return e.persistence.runTransaction("Get highest unacknowledged batch id", "readonly", (t => e.Bs.getHighestUnacknowledgedBatchId(t)));
        }(n.localStore);
        if (-1 === t) 
        // Trigger the callback right away if there is no pending writes at the moment.
        return void e.resolve();
        const s = n.aa.get(t) || [];
        s.push(e), n.aa.set(t, s);
    } catch (t) {
        const n = xu(t, "Initialization of waitForPendingWrites() operation failed");
        e.reject(n);
    }
}

/**
 * Triggers the callbacks that are waiting for this batch id to get acknowledged by server,
 * if there are any.
 */ function ha(t, e) {
    (t.aa.get(e) || []).forEach((t => {
        t.resolve();
    })), t.aa.delete(e);
}

/** Reject all outstanding callbacks waiting for pending writes to complete. */ function la(t, e, n) {
    const s = G(t);
    let i = s.ua[s.currentUser.toKey()];
    // NOTE: Mutations restored from persistence won't have callbacks, so it's
    // okay for there to be no callback for this ID.
        if (i) {
        const t = i.get(e);
        t && (n ? t.reject(n) : t.resolve(), i = i.remove(e)), s.ua[s.currentUser.toKey()] = i;
    }
}

function fa(t, e, n = null) {
    t.sharedClientState.removeLocalQueryTarget(e);
    for (const s of t.na.get(e)) t.ea.delete(s), n && t.ta.fa(s, n);
    if (t.na.delete(e), t.isPrimaryClient) {
        t.oa.Pi(e).forEach((e => {
            t.oa.containsKey(e) || 
            // We removed the last reference for this key
            da(t, e);
        }));
    }
}

function da(t, e) {
    t.sa.delete(e.path.canonicalString());
    // It's possible that the target already got removed because the query failed. In that case,
    // the key won't exist in `limboTargetsByKey`. Only do the cleanup if we still have the target.
    const n = t.ia.get(e);
    null !== n && (ou(t.remoteStore, n), t.ia = t.ia.remove(e), t.ra.delete(n), ma(t));
}

function _a(t, e, n) {
    for (const s of n) if (s instanceof zu) t.oa.addReference(s.key, e), wa(t, s); else if (s instanceof Hu) {
        F("SyncEngine", "Document no longer in limbo: " + s.key), t.oa.removeReference(s.key, e);
        t.oa.containsKey(s.key) || 
        // We removed the last reference for this key
        da(t, s.key);
    } else U();
}

function wa(t, e) {
    const n = e.key, s = n.path.canonicalString();
    t.ia.get(n) || t.sa.has(s) || (F("SyncEngine", "New document in limbo: " + n), t.sa.add(s), 
    ma(t));
}

/**
 * Starts listens for documents in limbo that are enqueued for resolution,
 * subject to a maximum number of concurrent resolutions.
 *
 * Without bounding the number of concurrent resolutions, the server can fail
 * with "resource exhausted" errors which can lead to pathological client
 * behavior as seen in https://github.com/firebase/firebase-js-sdk/issues/2683.
 */ function ma(t) {
    for (;t.sa.size > 0 && t.ia.size < t.maxConcurrentLimboResolutions; ) {
        const e = t.sa.values().next().value;
        t.sa.delete(e);
        const n = new kt(wt.fromString(e)), s = t.ca.next();
        t.ra.set(s, new Xu(n)), t.ia = t.ia.insert(n, s), ru(t.remoteStore, new Oi(je(Be(n.path)), s, 2 /* LimboResolution */ , st.A));
    }
}

async function ga(t, e, n) {
    const s = G(t), i = [], r = [], o = [];
    s.ea.isEmpty() || (s.ea.forEach(((t, u) => {
        o.push(s.la(u, e, n).then((t => {
            if (t) {
                s.isPrimaryClient && s.sharedClientState.updateQueryState(u.targetId, t.fromCache ? "not-current" : "current"), 
                i.push(t);
                const e = no.Ys(u.targetId, t);
                r.push(e);
            }
        })));
    })), await Promise.all(o), s.ta.Qo(i), await async function(t, e) {
        const n = G(t);
        try {
            await n.persistence.runTransaction("notifyLocalViewChanges", "readwrite", (t => Ti.forEach(e, (e => Ti.forEach(e.Hs, (s => n.persistence.referenceDelegate.addReference(t, e.targetId, s))).next((() => Ti.forEach(e.Js, (s => n.persistence.referenceDelegate.removeReference(t, e.targetId, s)))))))));
        } catch (t) {
            if (!bi(t)) throw t;
            // If `notifyLocalViewChanges` fails, we did not advance the sequence
            // number for the documents that were included in this transaction.
            // This might trigger them to be deleted earlier than they otherwise
            // would have, but it should not invalidate the integrity of the data.
            F("LocalStore", "Failed to update sequence numbers: " + t);
        }
        for (const t of e) {
            const e = t.targetId;
            if (!t.fromCache) {
                const t = n.ii.get(e), s = t.snapshotVersion, i = t.withLastLimboFreeSnapshotVersion(s);
                // Advance the last limbo free snapshot version
                                n.ii = n.ii.insert(e, i);
            }
        }
    }(s.localStore, r));
}

async function ya(t, e) {
    const n = G(t);
    if (!n.currentUser.isEqual(e)) {
        F("SyncEngine", "User change. New user:", e.toKey());
        const t = await oo(n.localStore, e);
        n.currentUser = e, 
        // Fails tasks waiting for pending writes requested by previous user.
        function(t, e) {
            t.aa.forEach((t => {
                t.forEach((t => {
                    t.reject(new j(Q.CANCELLED, e));
                }));
            })), t.aa.clear();
        }(n, "'waitForPendingWrites' promise is rejected due to a user change."), 
        // TODO(b/114226417): Consider calling this only in the primary tab.
        n.sharedClientState.handleUserChange(e, t.removedBatchIds, t.addedBatchIds), await ga(n, t.hi);
    }
}

function pa(t, e) {
    const n = G(t), s = n.ra.get(e);
    if (s && s.Zu) return ts().add(s.key);
    {
        let t = ts();
        const s = n.na.get(e);
        if (!s) return t;
        for (const e of s) {
            const s = n.ea.get(e);
            t = t.unionWith(s.view.Ku);
        }
        return t;
    }
}

/**
 * Reconcile the list of synced documents in an existing view with those
 * from persistence.
 */ async function Ia(t, e) {
    const n = G(t), s = await wo(n.localStore, e.query, 
    /* usePreviousResults= */ !0), i = e.view.Yu(s);
    return n.isPrimaryClient && _a(n, e.targetId, i.Hu), i;
}

/**
 * Retrieves newly changed documents from remote document cache and raises
 * snapshots if needed.
 */
// PORTING NOTE: Multi-Tab only.
async function Ta(t, e) {
    const n = G(t);
    return go(n.localStore, e).then((t => ga(n, t)));
}

/** Applies a mutation state to an existing batch.  */
// PORTING NOTE: Multi-Tab only.
async function Ea(t, e, n, s) {
    const i = G(t), r = await function(t, e) {
        const n = G(t), s = G(n.Bs);
        return n.persistence.runTransaction("Lookup mutation documents", "readonly", (t => s.fn(t, e).next((e => e ? n.ci.Ks(t, e) : Ti.resolve(null)))));
    }
    // PORTING NOTE: Multi-Tab only.
    (i.localStore, e);
    null !== r ? ("pending" === n ? 
    // If we are the primary client, we need to send this write to the
    // backend. Secondary clients will ignore these writes since their remote
    // connection is disabled.
    await yu(i.remoteStore) : "acknowledged" === n || "rejected" === n ? (
    // NOTE: Both these methods are no-ops for batches that originated from
    // other clients.
    la(i, e, s || null), ha(i, e), function(t, e) {
        G(G(t).Bs)._n(e);
    }
    // PORTING NOTE: Multi-Tab only.
    (i.localStore, e)) : U(), await ga(i, r)) : 
    // A throttled tab may not have seen the mutation before it was completed
    // and removed from the mutation queue, in which case we won't have cached
    // the affected documents. In this case we can safely ignore the update
    // since that means we didn't apply the mutation locally at all (if we
    // had, we would have cached the affected documents), and so we will just
    // see any resulting document changes via normal remote document updates
    // as applicable.
    F("SyncEngine", "Cannot apply mutation batch with id: " + e);
}

/** Applies a query target change from a different tab. */
// PORTING NOTE: Multi-Tab only.
async function Aa(t, e) {
    const n = G(t);
    if (Sa(n), Da(n), !0 === e && !0 !== n.ha) {
        // Secondary tabs only maintain Views for their local listeners and the
        // Views internal state may not be 100% populated (in particular
        // secondary tabs don't track syncedDocuments, the set of documents the
        // server considers to be in the target). So when a secondary becomes
        // primary, we need to need to make sure that all views for all targets
        // match the state on disk.
        const t = n.sharedClientState.getAllActiveQueryTargets(), e = await Ra(n, t.toArray());
        n.ha = !0, await vu(n.remoteStore, !0);
        for (const t of e) ru(n.remoteStore, t);
    } else if (!1 === e && !1 !== n.ha) {
        const t = [];
        let e = Promise.resolve();
        n.na.forEach(((s, i) => {
            n.sharedClientState.isLocalQueryTarget(i) ? t.push(i) : e = e.then((() => (fa(n, i), 
            _o(n.localStore, i, 
            /*keepPersistedTargetData=*/ !0)))), ou(n.remoteStore, i);
        })), await e, await Ra(n, t), 
        // PORTING NOTE: Multi-Tab only.
        function(t) {
            const e = G(t);
            e.ra.forEach(((t, n) => {
                ou(e.remoteStore, n);
            })), e.oa.bi(), e.ra = new Map, e.ia = new Un(kt.comparator);
        }
        /**
 * Reconcile the query views of the provided query targets with the state from
 * persistence. Raises snapshots for any changes that affect the local
 * client and returns the updated state of all target's query data.
 *
 * @param syncEngine - The sync engine implementation
 * @param targets - the list of targets with views that need to be recomputed
 * @param transitionToPrimary - `true` iff the tab transitions from a secondary
 * tab to a primary tab
 */
        // PORTING NOTE: Multi-Tab only.
        (n), n.ha = !1, await vu(n.remoteStore, !1);
    }
}

async function Ra(t, e, n) {
    const s = G(t), i = [], r = [];
    for (const t of e) {
        let e;
        const n = s.na.get(t);
        if (n && 0 !== n.length) {
            // For queries that have a local View, we fetch their current state
            // from LocalStore (as the resume token and the snapshot version
            // might have changed) and reconcile their views with the persisted
            // state (the list of syncedDocuments may have gotten out of sync).
            e = await fo(s.localStore, je(n[0]));
            for (const t of n) {
                const e = s.ea.get(t), n = await Ia(s, e);
                n.snapshot && r.push(n.snapshot);
            }
        } else {
            // For queries that never executed on this client, we need to
            // allocate the target in LocalStore and initialize a new View.
            const n = await mo(s.localStore, t);
            e = await fo(s.localStore, n), await ea(s, Pa(n), t, 
            /*current=*/ !1);
        }
        i.push(e);
    }
    return s.ta.Qo(r), i;
}

/**
 * Creates a `Query` object from the specified `Target`. There is no way to
 * obtain the original `Query`, so we synthesize a `Query` from the `Target`
 * object.
 *
 * The synthesized result might be different from the original `Query`, but
 * since the synthesized `Query` should return the same results as the
 * original one (only the presentation of results might differ), the potential
 * difference will not cause issues.
 */
// PORTING NOTE: Multi-Tab only.
function Pa(t) {
    return $e(t.path, t.collectionGroup, t.orderBy, t.filters, t.limit, "F" /* First */ , t.startAt, t.endAt);
}

/** Returns the IDs of the clients that are currently active. */
// PORTING NOTE: Multi-Tab only.
function ba(t) {
    const e = G(t);
    return G(G(e.localStore).persistence).Fs();
}

/** Applies a query target change from a different tab. */
// PORTING NOTE: Multi-Tab only.
async function Va(t, e, n, s) {
    const i = G(t);
    if (i.ha) 
    // If we receive a target state notification via WebStorage, we are
    // either already secondary or another tab has taken the primary lease.
    return void F("SyncEngine", "Ignoring unexpected query state notification.");
    const r = i.na.get(e);
    if (r && r.length > 0) switch (n) {
      case "current":
      case "not-current":
        {
            const t = await go(i.localStore, Xe(r[0])), s = ss.createSynthesizedRemoteEventForCurrentChange(e, "current" === n);
            await ga(i, t, s);
            break;
        }

      case "rejected":
        await _o(i.localStore, e, 
        /* keepPersistedTargetData */ !0), fa(i, e, s);
        break;

      default:
        U();
    }
}

/** Adds or removes Watch targets for queries from different tabs. */ async function va(t, e, n) {
    const s = Sa(t);
    if (s.ha) {
        for (const t of e) {
            if (s.na.has(t)) {
                // A target might have been added in a previous attempt
                F("SyncEngine", "Adding an already active target " + t);
                continue;
            }
            const e = await mo(s.localStore, t), n = await fo(s.localStore, e);
            await ea(s, Pa(e), n.targetId, 
            /*current=*/ !1), ru(s.remoteStore, n);
        }
        for (const t of n) 
        // Check that the target is still active since the target might have been
        // removed if it has been rejected by the backend.
        s.na.has(t) && 
        // Release queries that are still active.
        await _o(s.localStore, t, 
        /* keepPersistedTargetData */ !1).then((() => {
            ou(s.remoteStore, t), fa(s, t);
        })).catch(Nr);
    }
}

function Sa(t) {
    const e = G(t);
    return e.remoteStore.remoteSyncer.applyRemoteEvent = ia.bind(null, e), e.remoteStore.remoteSyncer.getRemoteKeysForTarget = pa.bind(null, e), 
    e.remoteStore.remoteSyncer.rejectListen = oa.bind(null, e), e.ta.Qo = Lu.bind(null, e.eventManager), 
    e.ta.fa = Uu.bind(null, e.eventManager), e;
}

function Da(t) {
    const e = G(t);
    return e.remoteStore.remoteSyncer.applySuccessfulWrite = ua.bind(null, e), e.remoteStore.remoteSyncer.rejectFailedWrite = aa.bind(null, e), 
    e;
}

/**
 * Loads a Firestore bundle into the SDK. The returned promise resolves when
 * the bundle finished loading.
 *
 * @param syncEngine - SyncEngine to use.
 * @param bundleReader - Bundle to load into the SDK.
 * @param task - LoadBundleTask used to update the loading progress to public API.
 */ function Ca(t, e, n) {
    const s = G(t);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
        (
    /** Loads a bundle and returns the list of affected collection groups. */
    async function(t, e, n) {
        try {
            const s = await e.getMetadata();
            if (await function(t, e) {
                const n = G(t), s = ys(e.createTime);
                return n.persistence.runTransaction("hasNewerBundle", "readonly", (t => n._s.getBundleMetadata(t, e.id))).then((t => !!t && t.createTime.compareTo(s) >= 0));
            }
            /**
 * Saves the given `BundleMetadata` to local persistence.
 */ (t.localStore, s)) return await e.close(), n._completeWith(function(t) {
                return {
                    taskState: "Success",
                    documentsLoaded: t.totalDocuments,
                    bytesLoaded: t.totalBytes,
                    totalDocuments: t.totalDocuments,
                    totalBytes: t.totalBytes
                };
            }(s)), Promise.resolve(new Set);
            n._updateProgress(Wu(s));
            const i = new ju(s, t.localStore, e.M);
            let r = await e.da();
            for (;r; ) {
                const t = await i.ku(r);
                t && n._updateProgress(t), r = await e.da();
            }
            const o = await i.complete();
            return await ga(t, o.Fu, 
            /* remoteEvent */ void 0), 
            // Save metadata, so loading the same bundle will skip.
            await function(t, e) {
                const n = G(t);
                return n.persistence.runTransaction("Save bundle", "readwrite", (t => n._s.saveBundleMetadata(t, e)));
            }
            /**
 * Returns a promise of a `NamedQuery` associated with given query name. Promise
 * resolves to undefined if no persisted data can be found.
 */ (t.localStore, s), n._completeWith(o.progress), Promise.resolve(o.Ou);
        } catch (t) {
            return B("SyncEngine", `Loading bundle failed with ${t}`), n._failWith(t), Promise.resolve(new Set);
        }
    }
    /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
    /**
 * Provides all components needed for Firestore with in-memory persistence.
 * Uses EagerGC garbage collection.
 */)(s, e, n).then((t => {
        s.sharedClientState.notifyBundleLoaded(t);
    }));
}

class xa {
    constructor() {
        this.synchronizeTabs = !1;
    }
    async initialize(t) {
        this.M = Ho(t.databaseInfo.databaseId), this.sharedClientState = this._a(t), this.persistence = this.wa(t), 
        await this.persistence.start(), this.gcScheduler = this.ma(t), this.localStore = this.ga(t);
    }
    ma(t) {
        return null;
    }
    ga(t) {
        return ro(this.persistence, new so, t.initialUser, this.M);
    }
    wa(t) {
        return new So(Co.zi, this.M);
    }
    _a(t) {
        return new Uo;
    }
    async terminate() {
        this.gcScheduler && this.gcScheduler.stop(), await this.sharedClientState.shutdown(), 
        await this.persistence.shutdown();
    }
}

/**
 * Provides all components needed for Firestore with IndexedDB persistence.
 */ class Na extends xa {
    constructor(t, e, n) {
        super(), this.ya = t, this.cacheSizeBytes = e, this.forceOwnership = n, this.synchronizeTabs = !1;
    }
    async initialize(t) {
        await super.initialize(t), await this.ya.initialize(this, t), 
        // Enqueue writes from a previous session
        await Da(this.ya.syncEngine), await yu(this.ya.remoteStore), 
        // NOTE: This will immediately call the listener, so we make sure to
        // set it after localStore / remoteStore are started.
        await this.persistence.Ts((() => (this.gcScheduler && !this.gcScheduler.started && this.gcScheduler.start(this.localStore), 
        Promise.resolve())));
    }
    ga(t) {
        return ro(this.persistence, new so, t.initialUser, this.M);
    }
    ma(t) {
        const e = this.persistence.referenceDelegate.garbageCollector;
        return new Or(e, t.asyncQueue);
    }
    wa(t) {
        const e = to(t.databaseInfo.databaseId, t.databaseInfo.persistenceKey), n = void 0 !== this.cacheSizeBytes ? Ir.withCacheSize(this.cacheSizeBytes) : Ir.DEFAULT;
        return new Yr(this.synchronizeTabs, e, t.clientId, n, t.asyncQueue, Wo(), zo(), this.M, this.sharedClientState, !!this.forceOwnership);
    }
    _a(t) {
        return new Uo;
    }
}

/**
 * Provides all components needed for Firestore with multi-tab IndexedDB
 * persistence.
 *
 * In the legacy client, this provider is used to provide both multi-tab and
 * non-multi-tab persistence since we cannot tell at build time whether
 * `synchronizeTabs` will be enabled.
 */ class ka extends Na {
    constructor(t, e) {
        super(t, e, /* forceOwnership= */ !1), this.ya = t, this.cacheSizeBytes = e, this.synchronizeTabs = !0;
    }
    async initialize(t) {
        await super.initialize(t);
        const e = this.ya.syncEngine;
        this.sharedClientState instanceof Lo && (this.sharedClientState.syncEngine = {
            Mr: Ea.bind(null, e),
            Or: Va.bind(null, e),
            Fr: va.bind(null, e),
            Fs: ba.bind(null, e),
            kr: Ta.bind(null, e)
        }, await this.sharedClientState.start()), 
        // NOTE: This will immediately call the listener, so we make sure to
        // set it after localStore / remoteStore are started.
        await this.persistence.Ts((async t => {
            await Aa(this.ya.syncEngine, t), this.gcScheduler && (t && !this.gcScheduler.started ? this.gcScheduler.start(this.localStore) : t || this.gcScheduler.stop());
        }));
    }
    _a(t) {
        const e = Wo();
        if (!Lo.vt(e)) throw new j(Q.UNIMPLEMENTED, "IndexedDB persistence is only available on platforms that support LocalStorage.");
        const n = to(t.databaseInfo.databaseId, t.databaseInfo.persistenceKey);
        return new Lo(e, t.asyncQueue, n, t.clientId, t.initialUser);
    }
}

/**
 * Initializes and wires the components that are needed to interface with the
 * network.
 */ class Ma {
    async initialize(t, e) {
        this.localStore || (this.localStore = t.localStore, this.sharedClientState = t.sharedClientState, 
        this.datastore = this.createDatastore(e), this.remoteStore = this.createRemoteStore(e), 
        this.eventManager = this.createEventManager(e), this.syncEngine = this.createSyncEngine(e, 
        /* startAsPrimary=*/ !t.synchronizeTabs), this.sharedClientState.onlineStateHandler = t => ra(this.syncEngine, t, 1 /* SharedClientState */), 
        this.remoteStore.remoteSyncer.handleCredentialChange = ya.bind(null, this.syncEngine), 
        await vu(this.remoteStore, this.syncEngine.isPrimaryClient));
    }
    createEventManager(t) {
        return new Fu;
    }
    createDatastore(t) {
        const e = Ho(t.databaseInfo.databaseId), n = (s = t.databaseInfo, new jo(s));
        var s;
        /** Return the Platform-specific connectivity monitor. */        return function(t, e, n, s) {
            return new tu(t, e, n, s);
        }(t.authCredentials, t.appCheckCredentials, n, e);
    }
    createRemoteStore(t) {
        return e = this.localStore, n = this.datastore, s = t.asyncQueue, i = t => ra(this.syncEngine, t, 0 /* RemoteStore */), 
        r = Ko.vt() ? new Ko : new qo, new nu(e, n, s, i, r);
        var e, n, s, i, r;
        /** Re-enables the network. Idempotent. */    }
    createSyncEngine(t, e) {
        return function(t, e, n, 
        // PORTING NOTE: Manages state synchronization in multi-tab environments.
        s, i, r, o) {
            const u = new Zu(t, e, n, s, i, r);
            return o && (u.ha = !0), u;
        }(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, t.initialUser, t.maxConcurrentLimboResolutions, e);
    }
    terminate() {
        return async function(t) {
            const e = G(t);
            F("RemoteStore", "RemoteStore shutting down."), e.fu.add(5 /* Shutdown */), await iu(e), 
            e._u.shutdown(), 
            // Set the OnlineState to Unknown (rather than Offline) to avoid potentially
            // triggering spurious listener events with cached data, etc.
            e.wu.set("Unknown" /* Unknown */);
        }(this.remoteStore);
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * How many bytes to read each time when `ReadableStreamReader.read()` is
 * called. Only applicable for byte streams that we control (e.g. those backed
 * by an UInt8Array).
 */
/**
 * Builds a `ByteStreamReader` from a UInt8Array.
 * @param source - The data source to use.
 * @param bytesPerRead - How many bytes each `read()` from the returned reader
 *        will read.
 */
function Oa(t, e = 10240) {
    let n = 0;
    // The TypeScript definition for ReadableStreamReader changed. We use
    // `any` here to allow this code to compile with different versions.
    // See https://github.com/microsoft/TypeScript/issues/42970
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async read() {
            if (n < t.byteLength) {
                const s = {
                    value: t.slice(n, n + e),
                    done: !1
                };
                return n += e, s;
            }
            return {
                done: !0
            };
        },
        async cancel() {},
        releaseLock() {},
        closed: Promise.reject("unimplemented")
    };
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * On web, a `ReadableStream` is wrapped around by a `ByteStreamReader`.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*
 * A wrapper implementation of Observer<T> that will dispatch events
 * asynchronously. To allow immediate silencing, a mute call is added which
 * causes events scheduled to no longer be raised.
 */
class Fa {
    constructor(t) {
        this.observer = t, 
        /**
         * When set to true, will not raise future events. Necessary to deal with
         * async detachment of listener.
         */
        this.muted = !1;
    }
    next(t) {
        this.observer.next && this.pa(this.observer.next, t);
    }
    error(t) {
        this.observer.error ? this.pa(this.observer.error, t) : console.error("Uncaught Error in snapshot listener:", t);
    }
    Ia() {
        this.muted = !0;
    }
    pa(t, e) {
        this.muted || setTimeout((() => {
            this.muted || t(e);
        }), 0);
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A class representing a bundle.
 *
 * Takes a bundle stream or buffer, and presents abstractions to read bundled
 * elements out of the underlying content.
 */ class $a {
    constructor(
    /** The reader to read from underlying binary bundle data source. */
    t, e) {
        this.Ta = t, this.M = e, 
        /** Cached bundle metadata. */
        this.metadata = new W, 
        /**
         * Internal buffer to hold bundle content, accumulating incomplete element
         * content.
         */
        this.buffer = new Uint8Array, this.Ea = new TextDecoder("utf-8"), 
        // Read the metadata (which is the first element).
        this.Aa().then((t => {
            t && t.xu() ? this.metadata.resolve(t.payload.metadata) : this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is\n             ${JSON.stringify(null == t ? void 0 : t.payload)}`));
        }), (t => this.metadata.reject(t)));
    }
    close() {
        return this.Ta.cancel();
    }
    async getMetadata() {
        return this.metadata.promise;
    }
    async da() {
        // Makes sure metadata is read before proceeding.
        return await this.getMetadata(), this.Aa();
    }
    /**
     * Reads from the head of internal buffer, and pulling more data from
     * underlying stream if a complete element cannot be found, until an
     * element(including the prefixed length and the JSON string) is found.
     *
     * Once a complete element is read, it is dropped from internal buffer.
     *
     * Returns either the bundled element, or null if we have reached the end of
     * the stream.
     */    async Aa() {
        const t = await this.Ra();
        if (null === t) return null;
        const e = this.Ea.decode(t), n = Number(e);
        isNaN(n) && this.Pa(`length string (${e}) is not valid number`);
        const s = await this.ba(n);
        return new Gu(JSON.parse(s), t.length + n);
    }
    /** First index of '{' from the underlying buffer. */    Va() {
        return this.buffer.findIndex((t => t === "{".charCodeAt(0)));
    }
    /**
     * Reads from the beginning of the internal buffer, until the first '{', and
     * return the content.
     *
     * If reached end of the stream, returns a null.
     */    async Ra() {
        for (;this.Va() < 0; ) {
            if (await this.va()) break;
        }
        // Broke out of the loop because underlying stream is closed, and there
        // happens to be no more data to process.
                if (0 === this.buffer.length) return null;
        const t = this.Va();
        // Broke out of the loop because underlying stream is closed, but still
        // cannot find an open bracket.
                t < 0 && this.Pa("Reached the end of bundle when a length string is expected.");
        const e = this.buffer.slice(0, t);
        // Update the internal buffer to drop the read length.
                return this.buffer = this.buffer.slice(t), e;
    }
    /**
     * Reads from a specified position from the internal buffer, for a specified
     * number of bytes, pulling more data from the underlying stream if needed.
     *
     * Returns a string decoded from the read bytes.
     */    async ba(t) {
        for (;this.buffer.length < t; ) {
            await this.va() && this.Pa("Reached the end of bundle when more is expected.");
        }
        const e = this.Ea.decode(this.buffer.slice(0, t));
        // Update the internal buffer to drop the read json string.
                return this.buffer = this.buffer.slice(t), e;
    }
    Pa(t) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        throw this.Ta.cancel(), new Error(`Invalid bundle format: ${t}`);
    }
    /**
     * Pulls more data from underlying stream to internal buffer.
     * Returns a boolean indicating whether the stream is finished.
     */    async va() {
        const t = await this.Ta.read();
        if (!t.done) {
            const e = new Uint8Array(this.buffer.length + t.value.length);
            e.set(this.buffer), e.set(t.value, this.buffer.length), this.buffer = e;
        }
        return t.done;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Internal transaction object responsible for accumulating the mutations to
 * perform and the base versions for any documents read.
 */
class Ba {
    constructor(t) {
        this.datastore = t, 
        // The version of each document that was read during this transaction.
        this.readVersions = new Map, this.mutations = [], this.committed = !1, 
        /**
         * A deferred usage error that occurred previously in this transaction that
         * will cause the transaction to fail once it actually commits.
         */
        this.lastWriteError = null, 
        /**
         * Set of documents that have been written in the transaction.
         *
         * When there's more than one write to the same key in a transaction, any
         * writes after the first are handled differently.
         */
        this.writtenDocs = new Set;
    }
    async lookup(t) {
        if (this.ensureCommitNotCalled(), this.mutations.length > 0) throw new j(Q.INVALID_ARGUMENT, "Firestore transactions require all reads to be executed before all writes.");
        const e = await async function(t, e) {
            const n = G(t), s = Ps(n.M) + "/documents", i = {
                documents: e.map((t => Ts(n.M, t)))
            }, r = await n.ho("BatchGetDocuments", s, i), o = new Map;
            r.forEach((t => {
                const e = Ss(n.M, t);
                o.set(e.key.toString(), e);
            }));
            const u = [];
            return e.forEach((t => {
                const e = o.get(t.toString());
                q(!!e), u.push(e);
            })), u;
        }(this.datastore, t);
        return e.forEach((t => this.recordVersion(t))), e;
    }
    set(t, e) {
        this.write(e.toMutation(t, this.precondition(t))), this.writtenDocs.add(t.toString());
    }
    update(t, e) {
        try {
            this.write(e.toMutation(t, this.preconditionForUpdate(t)));
        } catch (t) {
            this.lastWriteError = t;
        }
        this.writtenDocs.add(t.toString());
    }
    delete(t) {
        this.write(new Nn(t, this.precondition(t))), this.writtenDocs.add(t.toString());
    }
    async commit() {
        if (this.ensureCommitNotCalled(), this.lastWriteError) throw this.lastWriteError;
        const t = this.readVersions;
        // For each mutation, note that the doc was written.
                this.mutations.forEach((e => {
            t.delete(e.key.toString());
        })), 
        // For each document that was read but not written to, we want to perform
        // a `verify` operation.
        t.forEach(((t, e) => {
            const n = kt.fromPath(e);
            this.mutations.push(new kn(n, this.precondition(n)));
        })), await async function(t, e) {
            const n = G(t), s = Ps(n.M) + "/documents", i = {
                writes: e.map((t => Cs(n.M, t)))
            };
            await n.oo("Commit", s, i);
        }(this.datastore, this.mutations), this.committed = !0;
    }
    recordVersion(t) {
        let e;
        if (t.isFoundDocument()) e = t.version; else {
            if (!t.isNoDocument()) throw U();
            // For deleted docs, we must use baseVersion 0 when we overwrite them.
            e = ht.min();
        }
        const n = this.readVersions.get(t.key.toString());
        if (n) {
            if (!e.isEqual(n)) 
            // This transaction will fail no matter what.
            throw new j(Q.ABORTED, "Document version changed between two reads.");
        } else this.readVersions.set(t.key.toString(), e);
    }
    /**
     * Returns the version of this document when it was read in this transaction,
     * as a precondition, or no precondition if it was not read.
     */    precondition(t) {
        const e = this.readVersions.get(t.toString());
        return !this.writtenDocs.has(t.toString()) && e ? In.updateTime(e) : In.none();
    }
    /**
     * Returns the precondition for a document if the operation is an update.
     */    preconditionForUpdate(t) {
        const e = this.readVersions.get(t.toString());
        // The first time a document is written, we want to take into account the
        // read time and existence
                if (!this.writtenDocs.has(t.toString()) && e) {
            if (e.isEqual(ht.min())) 
            // The document doesn't exist, so fail the transaction.
            // This has to be validated locally because you can't send a
            // precondition that a document does not exist without changing the
            // semantics of the backend write to be an insert. This is the reverse
            // of what we want, since we want to assert that the document doesn't
            // exist but then send the update and have it fail. Since we can't
            // express that to the backend, we have to validate locally.
            // Note: this can change once we can send separate verify writes in the
            // transaction.
            throw new j(Q.INVALID_ARGUMENT, "Can't update a document that doesn't exist.");
            // Document exists, base precondition on document update time.
                        return In.updateTime(e);
        }
        // Document was not read, so we just use the preconditions for a blind
        // update.
        return In.exists(!0);
    }
    write(t) {
        this.ensureCommitNotCalled(), this.mutations.push(t);
    }
    ensureCommitNotCalled() {}
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * TransactionRunner encapsulates the logic needed to run and retry transactions
 * with backoff.
 */
class La {
    constructor(t, e, n, s) {
        this.asyncQueue = t, this.datastore = e, this.updateFunction = n, this.deferred = s, 
        this.Sa = 5, this.Do = new Jo(this.asyncQueue, "transaction_retry" /* TransactionRetry */);
    }
    /** Runs the transaction and sets the result on deferred. */    run() {
        this.Sa -= 1, this.Da();
    }
    Da() {
        this.Do.To((async () => {
            const t = new Ba(this.datastore), e = this.Ca(t);
            e && e.then((e => {
                this.asyncQueue.enqueueAndForget((() => t.commit().then((() => {
                    this.deferred.resolve(e);
                })).catch((t => {
                    this.xa(t);
                }))));
            })).catch((t => {
                this.xa(t);
            }));
        }));
    }
    Ca(t) {
        try {
            const e = this.updateFunction(t);
            return !Ct(e) && e.catch && e.then ? e : (this.deferred.reject(Error("Transaction callback must return a Promise")), 
            null);
        } catch (t) {
            // Do not retry errors thrown by user provided updateFunction.
            return this.deferred.reject(t), null;
        }
    }
    xa(t) {
        this.Sa > 0 && this.Na(t) ? (this.Sa -= 1, this.asyncQueue.enqueueAndForget((() => (this.Da(), 
        Promise.resolve())))) : this.deferred.reject(t);
    }
    Na(t) {
        if ("FirebaseError" === t.name) {
            // In transactions, the backend will fail outdated reads with FAILED_PRECONDITION and
            // non-matching document versions with ABORTED. These errors should be retried.
            const e = t.code;
            return "aborted" === e || "failed-precondition" === e || !$n(e);
        }
        return !1;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * FirestoreClient is a top-level class that constructs and owns all of the
 * pieces of the client SDK architecture. It is responsible for creating the
 * async queue that is shared by all of the other components in the system.
 */
class Ua {
    constructor(t, e, 
    /**
     * Asynchronous queue responsible for all of our internal processing. When
     * we get incoming work from the user (via public API) or the network
     * (incoming GRPC messages), we should always schedule onto this queue.
     * This ensures all of our work is properly serialized (e.g. we don't
     * start processing a new operation while the previous one is waiting for
     * an async I/O to complete).
     */
    n, s) {
        this.authCredentials = t, this.appCheckCredentials = e, this.asyncQueue = n, this.databaseInfo = s, 
        this.user = x.UNAUTHENTICATED, this.clientId = rt.R(), this.authCredentialListener = () => Promise.resolve(), 
        this.appCheckCredentialListener = () => Promise.resolve(), this.authCredentials.start(n, (async t => {
            F("FirestoreClient", "Received user=", t.uid), await this.authCredentialListener(t), 
            this.user = t;
        })), this.appCheckCredentials.start(n, (t => (F("FirestoreClient", "Received new app check token=", t), 
        this.appCheckCredentialListener(t, this.user))));
    }
    async getConfiguration() {
        return {
            asyncQueue: this.asyncQueue,
            databaseInfo: this.databaseInfo,
            clientId: this.clientId,
            authCredentials: this.authCredentials,
            appCheckCredentials: this.appCheckCredentials,
            initialUser: this.user,
            maxConcurrentLimboResolutions: 100
        };
    }
    setCredentialChangeListener(t) {
        this.authCredentialListener = t;
    }
    setAppCheckTokenChangeListener(t) {
        this.appCheckCredentialListener = t;
    }
    /**
     * Checks that the client has not been terminated. Ensures that other methods on
     * this class cannot be called after the client is terminated.
     */    verifyNotTerminated() {
        if (this.asyncQueue.isShuttingDown) throw new j(Q.FAILED_PRECONDITION, "The client has already been terminated.");
    }
    terminate() {
        this.asyncQueue.enterRestrictedMode();
        const t = new W;
        return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async () => {
            try {
                this.onlineComponents && await this.onlineComponents.terminate(), this.offlineComponents && await this.offlineComponents.terminate(), 
                // The credentials provider must be terminated after shutting down the
                // RemoteStore as it will prevent the RemoteStore from retrieving auth
                // tokens.
                this.authCredentials.shutdown(), this.appCheckCredentials.shutdown(), t.resolve();
            } catch (e) {
                const n = xu(e, "Failed to shutdown persistence");
                t.reject(n);
            }
        })), t.promise;
    }
}

async function qa(t, e) {
    t.asyncQueue.verifyOperationInProgress(), F("FirestoreClient", "Initializing OfflineComponentProvider");
    const n = await t.getConfiguration();
    await e.initialize(n);
    let s = n.initialUser;
    t.setCredentialChangeListener((async t => {
        s.isEqual(t) || (await oo(e.localStore, t), s = t);
    })), 
    // When a user calls clearPersistence() in one client, all other clients
    // need to be terminated to allow the delete to succeed.
    e.persistence.setDatabaseDeletedListener((() => t.terminate())), t.offlineComponents = e;
}

async function Ka(t, e) {
    t.asyncQueue.verifyOperationInProgress();
    const n = await Ga(t);
    F("FirestoreClient", "Initializing OnlineComponentProvider");
    const s = await t.getConfiguration();
    await e.initialize(n, s), 
    // The CredentialChangeListener of the online component provider takes
    // precedence over the offline component provider.
    t.setCredentialChangeListener((t => Vu(e.remoteStore, t))), t.setAppCheckTokenChangeListener(((t, n) => Vu(e.remoteStore, n))), 
    t.onlineComponents = e;
}

async function Ga(t) {
    return t.offlineComponents || (F("FirestoreClient", "Using default OfflineComponentProvider"), 
    await qa(t, new xa)), t.offlineComponents;
}

async function Qa(t) {
    return t.onlineComponents || (F("FirestoreClient", "Using default OnlineComponentProvider"), 
    await Ka(t, new Ma)), t.onlineComponents;
}

function ja(t) {
    return Ga(t).then((t => t.persistence));
}

function Wa(t) {
    return Ga(t).then((t => t.localStore));
}

function za(t) {
    return Qa(t).then((t => t.remoteStore));
}

function Ha(t) {
    return Qa(t).then((t => t.syncEngine));
}

async function Ja(t) {
    const e = await Qa(t), n = e.eventManager;
    return n.onListen = ta.bind(null, e.syncEngine), n.onUnlisten = na.bind(null, e.syncEngine), 
    n;
}

/** Enables the network connection and re-enqueues all pending operations. */ function Ya(t) {
    return t.asyncQueue.enqueue((async () => {
        const e = await ja(t), n = await za(t);
        return e.setNetworkEnabled(!0), function(t) {
            const e = G(t);
            return e.fu.delete(0 /* UserDisabled */), su(e);
        }(n);
    }));
}

/** Disables the network connection. Pending operations will not complete. */ function Xa(t) {
    return t.asyncQueue.enqueue((async () => {
        const e = await ja(t), n = await za(t);
        return e.setNetworkEnabled(!1), async function(t) {
            const e = G(t);
            e.fu.add(0 /* UserDisabled */), await iu(e), 
            // Set the OnlineState to Offline so get()s return from cache, etc.
            e.wu.set("Offline" /* Offline */);
        }(n);
    }));
}

/**
 * Returns a Promise that resolves when all writes that were pending at the time
 * this method was called received server acknowledgement. An acknowledgement
 * can be either acceptance or rejection.
 */ function Za(t, e) {
    const n = new W;
    return t.asyncQueue.enqueueAndForget((async () => async function(t, e, n) {
        try {
            const s = await function(t, e) {
                const n = G(t);
                return n.persistence.runTransaction("read document", "readonly", (t => n.ci.Ls(t, e)));
            }(t, e);
            s.isFoundDocument() ? n.resolve(s) : s.isNoDocument() ? n.resolve(null) : n.reject(new j(Q.UNAVAILABLE, "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"));
        } catch (t) {
            const s = xu(t, `Failed to get document '${e} from cache`);
            n.reject(s);
        }
    }
    /**
 * Retrieves a latency-compensated document from the backend via a
 * SnapshotListener.
 */ (await Wa(t), e, n))), n.promise;
}

function tc(t, e, n = {}) {
    const s = new W;
    return t.asyncQueue.enqueueAndForget((async () => function(t, e, n, s, i) {
        const r = new Fa({
            next: r => {
                // Remove query first before passing event to user to avoid
                // user actions affecting the now stale query.
                e.enqueueAndForget((() => Bu(t, o)));
                const u = r.docs.has(n);
                !u && r.fromCache ? 
                // TODO(dimond): If we're online and the document doesn't
                // exist then we resolve with a doc.exists set to false. If
                // we're offline however, we reject the Promise in this
                // case. Two options: 1) Cache the negative response from
                // the server so we can deliver that even when you're
                // offline 2) Actually reject the Promise in the online case
                // if the document doesn't exist.
                i.reject(new j(Q.UNAVAILABLE, "Failed to get document because the client is offline.")) : u && r.fromCache && s && "server" === s.source ? i.reject(new j(Q.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')) : i.resolve(r);
            },
            error: t => i.reject(t)
        }), o = new Ku(Be(n.path), r, {
            includeMetadataChanges: !0,
            Cu: !0
        });
        return $u(t, o);
    }(await Ja(t), t.asyncQueue, e, n, s))), s.promise;
}

function ec(t, e) {
    const n = new W;
    return t.asyncQueue.enqueueAndForget((async () => async function(t, e, n) {
        try {
            const s = await wo(t, e, 
            /* usePreviousResults= */ !0), i = new Ju(e, s.li), r = i.Gu(s.documents), o = i.applyChanges(r, 
            /* updateLimboDocuments= */ !1);
            n.resolve(o.snapshot);
        } catch (t) {
            const s = xu(t, `Failed to execute query '${e} against cache`);
            n.reject(s);
        }
    }
    /**
 * Retrieves a latency-compensated query snapshot from the backend via a
 * SnapshotListener.
 */ (await Wa(t), e, n))), n.promise;
}

function nc(t, e, n = {}) {
    const s = new W;
    return t.asyncQueue.enqueueAndForget((async () => function(t, e, n, s, i) {
        const r = new Fa({
            next: n => {
                // Remove query first before passing event to user to avoid
                // user actions affecting the now stale query.
                e.enqueueAndForget((() => Bu(t, o))), n.fromCache && "server" === s.source ? i.reject(new j(Q.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : i.resolve(n);
            },
            error: t => i.reject(t)
        }), o = new Ku(n, r, {
            includeMetadataChanges: !0,
            Cu: !0
        });
        return $u(t, o);
    }(await Ja(t), t.asyncQueue, e, n, s))), s.promise;
}

function sc(t, e) {
    const n = new Fa(e);
    return t.asyncQueue.enqueueAndForget((async () => function(t, e) {
        G(t).Eu.add(e), 
        // Immediately fire an initial event, indicating all existing listeners
        // are in-sync.
        e.next();
    }(await Ja(t), n))), () => {
        n.Ia(), t.asyncQueue.enqueueAndForget((async () => function(t, e) {
            G(t).Eu.delete(e);
        }(await Ja(t), n)));
    };
}

/**
 * Takes an updateFunction in which a set of reads and writes can be performed
 * atomically. In the updateFunction, the client can read and write values
 * using the supplied transaction object. After the updateFunction, all
 * changes will be committed. If a retryable error occurs (ex: some other
 * client has changed any of the data referenced), then the updateFunction
 * will be called again after a backoff. If the updateFunction still fails
 * after all retries, then the transaction will be rejected.
 *
 * The transaction object passed to the updateFunction contains methods for
 * accessing documents and collections. Unlike other datastore access, data
 * accessed with the transaction will not reflect local changes that have not
 * been committed. For this reason, it is required that all reads are
 * performed before any writes. Transactions must be performed while online.
 */ function ic(t, e) {
    const n = new W;
    return t.asyncQueue.enqueueAndForget((async () => {
        const s = await function(t) {
            return Qa(t).then((t => t.datastore));
        }(t);
        new La(t.asyncQueue, s, e, n).run();
    })), n.promise;
}

function rc(t, e, n, s) {
    const i = function(t, e) {
        let n;
        n = "string" == typeof t ? (new TextEncoder).encode(t) : t;
        return function(t, e) {
            return new $a(t, e);
        }(function(t, e) {
            if (t instanceof Uint8Array) return Oa(t, e);
            if (t instanceof ArrayBuffer) return Oa(new Uint8Array(t), e);
            if (t instanceof ReadableStream) return t.getReader();
            throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream");
        }(n), e);
    }
    /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ (n, Ho(e));
    t.asyncQueue.enqueueAndForget((async () => {
        Ca(await Ha(t), i, s);
    }));
}

function oc(t, e) {
    return t.asyncQueue.enqueue((async () => function(t, e) {
        const n = G(t);
        return n.persistence.runTransaction("Get named query", "readonly", (t => n._s.getNamedQuery(t, e)));
    }(await Wa(t), e)));
}

const uc = new Map;

/**
 * An instance map that ensures only one Datastore exists per Firestore
 * instance.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ac(t, e, n) {
    if (!n) throw new j(Q.INVALID_ARGUMENT, `Function ${t}() cannot be called with an empty ${e}.`);
}

/**
 * Validates that two boolean options are not set at the same time.
 * @internal
 */ function cc(t, e, n, s) {
    if (!0 === e && !0 === s) throw new j(Q.INVALID_ARGUMENT, `${t} and ${n} cannot be used together.`);
}

/**
 * Validates that `path` refers to a document (indicated by the fact it contains
 * an even numbers of segments).
 */ function hc(t) {
    if (!kt.isDocumentKey(t)) throw new j(Q.INVALID_ARGUMENT, `Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`);
}

/**
 * Validates that `path` refers to a collection (indicated by the fact it
 * contains an odd numbers of segments).
 */ function lc(t) {
    if (kt.isDocumentKey(t)) throw new j(Q.INVALID_ARGUMENT, `Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`);
}

/**
 * Returns true if it's a non-null object without a custom prototype
 * (i.e. excludes Array, Date, etc.).
 */
/** Returns a string describing the type / value of the provided input. */
function fc(t) {
    if (void 0 === t) return "undefined";
    if (null === t) return "null";
    if ("string" == typeof t) return t.length > 20 && (t = `${t.substring(0, 20)}...`), 
    JSON.stringify(t);
    if ("number" == typeof t || "boolean" == typeof t) return "" + t;
    if ("object" == typeof t) {
        if (t instanceof Array) return "an array";
        {
            const e = 
            /** try to get the constructor name for an object. */
            function(t) {
                if (t.constructor) return t.constructor.name;
                return null;
            }
            /**
 * Casts `obj` to `T`, optionally unwrapping Compat types to expose the
 * underlying instance. Throws if  `obj` is not an instance of `T`.
 *
 * This cast is used in the Lite and Full SDK to verify instance types for
 * arguments passed to the public API.
 * @internal
 */ (t);
            return e ? `a custom ${e} object` : "an object";
        }
    }
    return "function" == typeof t ? "a function" : U();
}

function dc(t, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
e) {
    if ("_delegate" in t && (
    // Unwrap Compat types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t = t._delegate), !(t instanceof e)) {
        if (e.name === t.constructor.name) throw new j(Q.INVALID_ARGUMENT, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
        {
            const n = fc(t);
            throw new j(Q.INVALID_ARGUMENT, `Expected type '${e.name}', but it was: ${n}`);
        }
    }
    return t;
}

function _c(t, e) {
    if (e <= 0) throw new j(Q.INVALID_ARGUMENT, `Function ${t}() requires a positive number, but it was: ${e}.`);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// settings() defaults:
/**
 * A concrete type describing all the values that can be applied via a
 * user-supplied `FirestoreSettings` object. This is a separate type so that
 * defaults can be supplied and the value can be checked for equality.
 */
class wc {
    constructor(t) {
        var e;
        if (void 0 === t.host) {
            if (void 0 !== t.ssl) throw new j(Q.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
            this.host = "firestore.googleapis.com", this.ssl = true;
        } else this.host = t.host, this.ssl = null === (e = t.ssl) || void 0 === e || e;
        if (this.credentials = t.credentials, this.ignoreUndefinedProperties = !!t.ignoreUndefinedProperties, 
        void 0 === t.cacheSizeBytes) this.cacheSizeBytes = 41943040; else {
            if (-1 !== t.cacheSizeBytes && t.cacheSizeBytes < 1048576) throw new j(Q.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
            this.cacheSizeBytes = t.cacheSizeBytes;
        }
        this.experimentalForceLongPolling = !!t.experimentalForceLongPolling, this.experimentalAutoDetectLongPolling = !!t.experimentalAutoDetectLongPolling, 
        this.useFetchStreams = !!t.useFetchStreams, cc("experimentalForceLongPolling", t.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", t.experimentalAutoDetectLongPolling);
    }
    isEqual(t) {
        return this.host === t.host && this.ssl === t.ssl && this.credentials === t.credentials && this.cacheSizeBytes === t.cacheSizeBytes && this.experimentalForceLongPolling === t.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === t.experimentalAutoDetectLongPolling && this.ignoreUndefinedProperties === t.ignoreUndefinedProperties && this.useFetchStreams === t.useFetchStreams;
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The Cloud Firestore service interface.
 *
 * Do not call this constructor directly. Instead, use {@link getFirestore}.
 */ class mc {
    /** @hideconstructor */
    constructor(t, e, n) {
        this._authCredentials = e, this._appCheckCredentials = n, 
        /**
         * Whether it's a Firestore or Firestore Lite instance.
         */
        this.type = "firestore-lite", this._persistenceKey = "(lite)", this._settings = new wc({}), 
        this._settingsFrozen = !1, t instanceof Dt ? this._databaseId = t : (this._app = t, 
        this._databaseId = function(t) {
            if (!Object.prototype.hasOwnProperty.apply(t.options, [ "projectId" ])) throw new j(Q.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
            return new Dt(t.options.projectId);
        }
        /**
 * Modify this instance to communicate with the Cloud Firestore emulator.
 *
 * Note: This must be called before this instance has been used to do any
 * operations.
 *
 * @param firestore - The `Firestore` instance to configure to connect to the
 * emulator.
 * @param host - the emulator host (ex: localhost).
 * @param port - the emulator port (ex: 9000).
 * @param options.mockUserToken - the mock auth token to use for unit testing
 * Security Rules.
 */ (t));
    }
    /**
     * The {@link @firebase/app#FirebaseApp} associated with this `Firestore` service
     * instance.
     */    get app() {
        if (!this._app) throw new j(Q.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
        return this._app;
    }
    get _initialized() {
        return this._settingsFrozen;
    }
    get _terminated() {
        return void 0 !== this._terminateTask;
    }
    _setSettings(t) {
        if (this._settingsFrozen) throw new j(Q.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
        this._settings = new wc(t), void 0 !== t.credentials && (this._authCredentials = function(t) {
            if (!t) return new H;
            switch (t.type) {
              case "gapi":
                const e = t.client;
                // Make sure this really is a Gapi client.
                                return q(!("object" != typeof e || null === e || !e.auth || !e.auth.getAuthHeaderValueForFirstParty)), 
                new Z(e, t.sessionIndex || "0", t.iamToken || null);

              case "provider":
                return t.client;

              default:
                throw new j(Q.INVALID_ARGUMENT, "makeAuthCredentialsProvider failed due to invalid credential type");
            }
        }(t.credentials));
    }
    _getSettings() {
        return this._settings;
    }
    _freezeSettings() {
        return this._settingsFrozen = !0, this._settings;
    }
    _delete() {
        return this._terminateTask || (this._terminateTask = this._terminate()), this._terminateTask;
    }
    /** Returns a JSON-serializable representation of this `Firestore` instance. */    toJSON() {
        return {
            app: this._app,
            databaseId: this._databaseId,
            settings: this._settings
        };
    }
    /**
     * Terminates all components used by this client. Subclasses can override
     * this method to clean up their own dependencies, but must also call this
     * method.
     *
     * Only ever called once.
     */    _terminate() {
        /**
 * Removes all components associated with the provided instance. Must be called
 * when the `Firestore` instance is terminated.
 */
        return function(t) {
            const e = uc.get(t);
            e && (F("ComponentProvider", "Removing Datastore"), uc.delete(t), e.terminate());
        }(this), Promise.resolve();
    }
}

function gc(t, e, n, s = {}) {
    var i;
    const r = (t = dc(t, mc))._getSettings();
    if ("firestore.googleapis.com" !== r.host && r.host !== e && B("Host has been set in both settings() and useEmulator(), emulator host will be used"), 
    t._setSettings(Object.assign(Object.assign({}, r), {
        host: `${e}:${n}`,
        ssl: !1
    })), s.mockUserToken) {
        let e, n;
        if ("string" == typeof s.mockUserToken) e = s.mockUserToken, n = x.MOCK_USER; else {
            // Let createMockUserToken validate first (catches common mistakes like
            // invalid field "uid" and missing field "sub" / "user_id".)
            e = p(s.mockUserToken, null === (i = t._app) || void 0 === i ? void 0 : i.options.projectId);
            const r = s.mockUserToken.sub || s.mockUserToken.user_id;
            if (!r) throw new j(Q.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
            n = new x(r);
        }
        t._authCredentials = new J(new z(e, n));
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A `DocumentReference` refers to a document location in a Firestore database
 * and can be used to write, read, or listen to the location. The document at
 * the referenced location may or may not exist.
 */ class yc {
    /** @hideconstructor */
    constructor(t, 
    /**
     * If provided, the `FirestoreDataConverter` associated with this instance.
     */
    e, n) {
        this.converter = e, this._key = n, 
        /** The type of this Firestore reference. */
        this.type = "document", this.firestore = t;
    }
    get _path() {
        return this._key.path;
    }
    /**
     * The document's identifier within its collection.
     */    get id() {
        return this._key.path.lastSegment();
    }
    /**
     * A string representing the path of the referenced document (relative
     * to the root of the database).
     */    get path() {
        return this._key.path.canonicalString();
    }
    /**
     * The collection this `DocumentReference` belongs to.
     */    get parent() {
        return new Ic(this.firestore, this.converter, this._key.path.popLast());
    }
    withConverter(t) {
        return new yc(this.firestore, t, this._key);
    }
}

/**
 * A `Query` refers to a query which you can read or listen to. You can also
 * construct refined `Query` objects by adding filters and ordering.
 */ class pc {
    // This is the lite version of the Query class in the main SDK.
    /** @hideconstructor protected */
    constructor(t, 
    /**
     * If provided, the `FirestoreDataConverter` associated with this instance.
     */
    e, n) {
        this.converter = e, this._query = n, 
        /** The type of this Firestore reference. */
        this.type = "query", this.firestore = t;
    }
    withConverter(t) {
        return new pc(this.firestore, t, this._query);
    }
}

/**
 * A `CollectionReference` object can be used for adding documents, getting
 * document references, and querying for documents (using {@link query}).
 */ class Ic extends pc {
    /** @hideconstructor */
    constructor(t, e, n) {
        super(t, e, Be(n)), this._path = n, 
        /** The type of this Firestore reference. */
        this.type = "collection";
    }
    /** The collection's identifier. */    get id() {
        return this._query.path.lastSegment();
    }
    /**
     * A string representing the path of the referenced collection (relative
     * to the root of the database).
     */    get path() {
        return this._query.path.canonicalString();
    }
    /**
     * A reference to the containing `DocumentReference` if this is a
     * subcollection. If this isn't a subcollection, the reference is null.
     */    get parent() {
        const t = this._path.popLast();
        return t.isEmpty() ? null : new yc(this.firestore, 
        /* converter= */ null, new kt(t));
    }
    withConverter(t) {
        return new Ic(this.firestore, t, this._path);
    }
}

function Tc(t, e, ...n) {
    if (t = I(t), ac("collection", "path", e), t instanceof mc) {
        const s = wt.fromString(e, ...n);
        return lc(s), new Ic(t, /* converter= */ null, s);
    }
    {
        if (!(t instanceof yc || t instanceof Ic)) throw new j(Q.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
        const s = t._path.child(wt.fromString(e, ...n));
        return lc(s), new Ic(t.firestore, 
        /* converter= */ null, s);
    }
}

// TODO(firestorelite): Consider using ErrorFactory -
// https://github.com/firebase/firebase-js-sdk/blob/0131e1f/packages/util/src/errors.ts#L106
/**
 * Creates and returns a new `Query` instance that includes all documents in the
 * database that are contained in a collection or subcollection with the
 * given `collectionId`.
 *
 * @param firestore - A reference to the root `Firestore` instance.
 * @param collectionId - Identifies the collections to query over. Every
 * collection or subcollection with this ID as the last segment of its path
 * will be included. Cannot contain a slash.
 * @returns The created `Query`.
 */ function Ec(t, e) {
    if (t = dc(t, mc), ac("collectionGroup", "collection id", e), e.indexOf("/") >= 0) throw new j(Q.INVALID_ARGUMENT, `Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);
    return new pc(t, 
    /* converter= */ null, 
    /**
 * Creates a new Query for a collection group query that matches all documents
 * within the provided collection group.
 */
    function(t) {
        return new Fe(wt.emptyPath(), t);
    }(e));
}

function Ac(t, e, ...n) {
    if (t = I(t), 
    // We allow omission of 'pathString' but explicitly prohibit passing in both
    // 'undefined' and 'null'.
    1 === arguments.length && (e = rt.R()), ac("doc", "path", e), t instanceof mc) {
        const s = wt.fromString(e, ...n);
        return hc(s), new yc(t, 
        /* converter= */ null, new kt(s));
    }
    {
        if (!(t instanceof yc || t instanceof Ic)) throw new j(Q.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
        const s = t._path.child(wt.fromString(e, ...n));
        return hc(s), new yc(t.firestore, t instanceof Ic ? t.converter : null, new kt(s));
    }
}

/**
 * Returns true if the provided references are equal.
 *
 * @param left - A reference to compare.
 * @param right - A reference to compare.
 * @returns true if the references point to the same location in the same
 * Firestore database.
 */ function Rc(t, e) {
    return t = I(t), e = I(e), (t instanceof yc || t instanceof Ic) && (e instanceof yc || e instanceof Ic) && (t.firestore === e.firestore && t.path === e.path && t.converter === e.converter);
}

/**
 * Returns true if the provided queries point to the same collection and apply
 * the same constraints.
 *
 * @param left - A `Query` to compare.
 * @param right - A `Query` to compare.
 * @returns true if the references point to the same location in the same
 * Firestore database.
 */ function Pc(t, e) {
    return t = I(t), e = I(e), t instanceof pc && e instanceof pc && (t.firestore === e.firestore && ze(t._query, e._query) && t.converter === e.converter);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class bc {
    constructor() {
        // The last promise in the queue.
        this.ka = Promise.resolve(), 
        // A list of retryable operations. Retryable operations are run in order and
        // retried with backoff.
        this.Ma = [], 
        // Is this AsyncQueue being shut down? Once it is set to true, it will not
        // be changed again.
        this.Oa = !1, 
        // Operations scheduled to be queued in the future. Operations are
        // automatically removed after they are run or canceled.
        this.Fa = [], 
        // visible for testing
        this.$a = null, 
        // Flag set while there's an outstanding AsyncQueue operation, used for
        // assertion sanity-checks.
        this.Ba = !1, 
        // Enabled during shutdown on Safari to prevent future access to IndexedDB.
        this.La = !1, 
        // List of TimerIds to fast-forward delays for.
        this.Ua = [], 
        // Backoff timer used to schedule retries for retryable operations
        this.Do = new Jo(this, "async_queue_retry" /* AsyncQueueRetry */), 
        // Visibility handler that triggers an immediate retry of all retryable
        // operations. Meant to speed up recovery when we regain file system access
        // after page comes into foreground.
        this.qa = () => {
            const t = zo();
            t && F("AsyncQueue", "Visibility state changed to " + t.visibilityState), this.Do.Ao();
        };
        const t = zo();
        t && "function" == typeof t.addEventListener && t.addEventListener("visibilitychange", this.qa);
    }
    get isShuttingDown() {
        return this.Oa;
    }
    /**
     * Adds a new operation to the queue without waiting for it to complete (i.e.
     * we ignore the Promise result).
     */    enqueueAndForget(t) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.enqueue(t);
    }
    enqueueAndForgetEvenWhileRestricted(t) {
        this.Ka(), 
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.Ga(t);
    }
    enterRestrictedMode(t) {
        if (!this.Oa) {
            this.Oa = !0, this.La = t || !1;
            const e = zo();
            e && "function" == typeof e.removeEventListener && e.removeEventListener("visibilitychange", this.qa);
        }
    }
    enqueue(t) {
        if (this.Ka(), this.Oa) 
        // Return a Promise which never resolves.
        return new Promise((() => {}));
        // Create a deferred Promise that we can return to the callee. This
        // allows us to return a "hanging Promise" only to the callee and still
        // advance the queue even when the operation is not run.
                const e = new W;
        return this.Ga((() => this.Oa && this.La ? Promise.resolve() : (t().then(e.resolve, e.reject), 
        e.promise))).then((() => e.promise));
    }
    enqueueRetryable(t) {
        this.enqueueAndForget((() => (this.Ma.push(t), this.Qa())));
    }
    /**
     * Runs the next operation from the retryable queue. If the operation fails,
     * reschedules with backoff.
     */    async Qa() {
        if (0 !== this.Ma.length) {
            try {
                await this.Ma[0](), this.Ma.shift(), this.Do.reset();
            } catch (t) {
                if (!bi(t)) throw t;
 // Failure will be handled by AsyncQueue
                                F("AsyncQueue", "Operation failed with retryable error: " + t);
            }
            this.Ma.length > 0 && 
            // If there are additional operations, we re-schedule `retryNextOp()`.
            // This is necessary to run retryable operations that failed during
            // their initial attempt since we don't know whether they are already
            // enqueued. If, for example, `op1`, `op2`, `op3` are enqueued and `op1`
            // needs to  be re-run, we will run `op1`, `op1`, `op2` using the
            // already enqueued calls to `retryNextOp()`. `op3()` will then run in the
            // call scheduled here.
            // Since `backoffAndRun()` cancels an existing backoff and schedules a
            // new backoff on every call, there is only ever a single additional
            // operation in the queue.
            this.Do.To((() => this.Qa()));
        }
    }
    Ga(t) {
        const e = this.ka.then((() => (this.Ba = !0, t().catch((t => {
            this.$a = t, this.Ba = !1;
            const e = 
            /**
 * Chrome includes Error.message in Error.stack. Other browsers do not.
 * This returns expected output of message + stack when available.
 * @param error - Error or FirestoreError
 */
            function(t) {
                let e = t.message || "";
                t.stack && (e = t.stack.includes(t.message) ? t.stack : t.message + "\n" + t.stack);
                return e;
            }
            /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ (t);
            // Re-throw the error so that this.tail becomes a rejected Promise and
            // all further attempts to chain (via .then) will just short-circuit
            // and return the rejected Promise.
            throw $("INTERNAL UNHANDLED ERROR: ", e), t;
        })).then((t => (this.Ba = !1, t))))));
        return this.ka = e, e;
    }
    enqueueAfterDelay(t, e, n) {
        this.Ka(), 
        // Fast-forward delays for timerIds that have been overriden.
        this.Ua.indexOf(t) > -1 && (e = 0);
        const s = Cu.createAndSchedule(this, t, e, n, (t => this.ja(t)));
        return this.Fa.push(s), s;
    }
    Ka() {
        this.$a && U();
    }
    verifyOperationInProgress() {}
    /**
     * Waits until all currently queued tasks are finished executing. Delayed
     * operations are not run.
     */    async Wa() {
        // Operations in the queue prior to draining may have enqueued additional
        // operations. Keep draining the queue until the tail is no longer advanced,
        // which indicates that no more new operations were enqueued and that all
        // operations were executed.
        let t;
        do {
            t = this.ka, await t;
        } while (t !== this.ka);
    }
    /**
     * For Tests: Determine if a delayed operation with a particular TimerId
     * exists.
     */    za(t) {
        for (const e of this.Fa) if (e.timerId === t) return !0;
        return !1;
    }
    /**
     * For Tests: Runs some or all delayed operations early.
     *
     * @param lastTimerId - Delayed operations up to and including this TimerId
     * will be drained. Pass TimerId.All to run all delayed operations.
     * @returns a Promise that resolves once all operations have been run.
     */    Ha(t) {
        // Note that draining may generate more delayed ops, so we do that first.
        return this.Wa().then((() => {
            // Run ops in the same order they'd run if they ran naturally.
            this.Fa.sort(((t, e) => t.targetTimeMs - e.targetTimeMs));
            for (const e of this.Fa) if (e.skipDelay(), "all" /* All */ !== t && e.timerId === t) break;
            return this.Wa();
        }));
    }
    /**
     * For Tests: Skip all subsequent delays for a timer id.
     */    Ja(t) {
        this.Ua.push(t);
    }
    /** Called once a DelayedOperation is run or canceled. */    ja(t) {
        // NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
        const e = this.Fa.indexOf(t);
        this.Fa.splice(e, 1);
    }
}

function Vc(t) {
    /**
 * Returns true if obj is an object and contains at least one of the specified
 * methods.
 */
    return function(t, e) {
        if ("object" != typeof t || null === t) return !1;
        const n = t;
        for (const t of e) if (t in n && "function" == typeof n[t]) return !0;
        return !1;
    }
    /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
    /**
 * Represents the task of loading a Firestore bundle. It provides progress of bundle
 * loading, as well as task completion and error events.
 *
 * The API is compatible with `Promise<LoadBundleTaskProgress>`.
 */ (t, [ "next", "error", "complete" ]);
}

class vc {
    constructor() {
        this._progressObserver = {}, this._taskCompletionResolver = new W, this._lastProgress = {
            taskState: "Running",
            totalBytes: 0,
            totalDocuments: 0,
            bytesLoaded: 0,
            documentsLoaded: 0
        };
    }
    /**
     * Registers functions to listen to bundle loading progress events.
     * @param next - Called when there is a progress update from bundle loading. Typically `next` calls occur
     *   each time a Firestore document is loaded from the bundle.
     * @param error - Called when an error occurs during bundle loading. The task aborts after reporting the
     *   error, and there should be no more updates after this.
     * @param complete - Called when the loading task is complete.
     */    onProgress(t, e, n) {
        this._progressObserver = {
            next: t,
            error: e,
            complete: n
        };
    }
    /**
     * Implements the `Promise<LoadBundleTaskProgress>.catch` interface.
     *
     * @param onRejected - Called when an error occurs during bundle loading.
     */    catch(t) {
        return this._taskCompletionResolver.promise.catch(t);
    }
    /**
     * Implements the `Promise<LoadBundleTaskProgress>.then` interface.
     *
     * @param onFulfilled - Called on the completion of the loading task with a final `LoadBundleTaskProgress` update.
     *   The update will always have its `taskState` set to `"Success"`.
     * @param onRejected - Called when an error occurs during bundle loading.
     */    then(t, e) {
        return this._taskCompletionResolver.promise.then(t, e);
    }
    /**
     * Notifies all observers that bundle loading has completed, with a provided
     * `LoadBundleTaskProgress` object.
     *
     * @private
     */    _completeWith(t) {
        this._updateProgress(t), this._progressObserver.complete && this._progressObserver.complete(), 
        this._taskCompletionResolver.resolve(t);
    }
    /**
     * Notifies all observers that bundle loading has failed, with a provided
     * `Error` as the reason.
     *
     * @private
     */    _failWith(t) {
        this._lastProgress.taskState = "Error", this._progressObserver.next && this._progressObserver.next(this._lastProgress), 
        this._progressObserver.error && this._progressObserver.error(t), this._taskCompletionResolver.reject(t);
    }
    /**
     * Notifies a progress update of loading a bundle.
     * @param progress - The new progress.
     *
     * @private
     */    _updateProgress(t) {
        this._lastProgress = t, this._progressObserver.next && this._progressObserver.next(t);
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** DOMException error code constants. */ const Sc = -1;

/**
 * The Cloud Firestore service interface.
 *
 * Do not call this constructor directly. Instead, use {@link getFirestore}.
 */
class Dc extends mc {
    /** @hideconstructor */
    constructor(t, e, n) {
        super(t, e, n), 
        /**
         * Whether it's a {@link Firestore} or Firestore Lite instance.
         */
        this.type = "firestore", this._queue = new bc, this._persistenceKey = "name" in t ? t.name : "[DEFAULT]";
    }
    _terminate() {
        return this._firestoreClient || 
        // The client must be initialized to ensure that all subsequent API
        // usage throws an exception.
        kc(this), this._firestoreClient.terminate();
    }
}

/**
 * Initializes a new instance of {@link Firestore} with the provided settings.
 * Can only be called before any other function, including
 * {@link getFirestore}. If the custom settings are empty, this function is
 * equivalent to calling {@link getFirestore}.
 *
 * @param app - The {@link @firebase/app#FirebaseApp} with which the {@link Firestore} instance will
 * be associated.
 * @param settings - A settings object to configure the {@link Firestore} instance.
 * @returns A newly initialized {@link Firestore} instance.
 */ function Cc(t, e) {
    const n = _getProvider(t, "firestore");
    if (n.isInitialized()) {
        const t = n.getImmediate(), s = n.getOptions();
        if (T(s, e)) return t;
        throw new j(Q.FAILED_PRECONDITION, "initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.");
    }
    if (void 0 !== e.cacheSizeBytes && -1 !== e.cacheSizeBytes && e.cacheSizeBytes < 1048576) throw new j(Q.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
    return n.initialize({
        options: e
    });
}

/**
 * Returns the existing {@link Firestore} instance that is associated with the
 * provided {@link @firebase/app#FirebaseApp}. If no instance exists, initializes a new
 * instance with default settings.
 *
 * @param app - The {@link @firebase/app#FirebaseApp} instance that the returned {@link Firestore}
 * instance is associated with.
 * @returns The {@link Firestore} instance of the provided app.
 */ function xc(e = t()) {
    return _getProvider(e, "firestore").getImmediate();
}

/**
 * @internal
 */ function Nc(t) {
    return t._firestoreClient || kc(t), t._firestoreClient.verifyNotTerminated(), t._firestoreClient;
}

function kc(t) {
    var e;
    const n = t._freezeSettings(), s = function(t, e, n, s) {
        return new St(t, e, n, s.host, s.ssl, s.experimentalForceLongPolling, s.experimentalAutoDetectLongPolling, s.useFetchStreams);
    }(t._databaseId, (null === (e = t._app) || void 0 === e ? void 0 : e.options.appId) || "", t._persistenceKey, n);
    t._firestoreClient = new Ua(t._authCredentials, t._appCheckCredentials, t._queue, s);
}

/**
 * Attempts to enable persistent storage, if possible.
 *
 * Must be called before any other functions (other than
 * {@link initializeFirestore}, {@link getFirestore} or
 * {@link clearIndexedDbPersistence}.
 *
 * If this fails, `enableIndexedDbPersistence()` will reject the promise it
 * returns. Note that even after this failure, the {@link Firestore} instance will
 * remain usable, however offline persistence will be disabled.
 *
 * There are several reasons why this can fail, which can be identified by
 * the `code` on the error.
 *
 *   * failed-precondition: The app is already open in another browser tab.
 *   * unimplemented: The browser is incompatible with the offline
 *     persistence implementation.
 *
 * @param firestore - The {@link Firestore} instance to enable persistence for.
 * @param persistenceSettings - Optional settings object to configure
 * persistence.
 * @returns A `Promise` that represents successfully enabling persistent storage.
 */ function Mc(t, e) {
    Qc(t = dc(t, Dc));
    const n = Nc(t), s = t._freezeSettings(), i = new Ma;
    return Fc(n, i, new Na(i, s.cacheSizeBytes, null == e ? void 0 : e.forceOwnership));
}

/**
 * Attempts to enable multi-tab persistent storage, if possible. If enabled
 * across all tabs, all operations share access to local persistence, including
 * shared execution of queries and latency-compensated local document updates
 * across all connected instances.
 *
 * If this fails, `enableMultiTabIndexedDbPersistence()` will reject the promise
 * it returns. Note that even after this failure, the {@link Firestore} instance will
 * remain usable, however offline persistence will be disabled.
 *
 * There are several reasons why this can fail, which can be identified by
 * the `code` on the error.
 *
 *   * failed-precondition: The app is already open in another browser tab and
 *     multi-tab is not enabled.
 *   * unimplemented: The browser is incompatible with the offline
 *     persistence implementation.
 *
 * @param firestore - The {@link Firestore} instance to enable persistence for.
 * @returns A `Promise` that represents successfully enabling persistent
 * storage.
 */ function Oc(t) {
    Qc(t = dc(t, Dc));
    const e = Nc(t), n = t._freezeSettings(), s = new Ma;
    return Fc(e, s, new ka(s, n.cacheSizeBytes));
}

/**
 * Registers both the `OfflineComponentProvider` and `OnlineComponentProvider`.
 * If the operation fails with a recoverable error (see
 * `canRecoverFromIndexedDbError()` below), the returned Promise is rejected
 * but the client remains usable.
 */ function Fc(t, e, n) {
    const s = new W;
    return t.asyncQueue.enqueue((async () => {
        try {
            await qa(t, n), await Ka(t, e), s.resolve();
        } catch (t) {
            if (!
            /**
 * Decides whether the provided error allows us to gracefully disable
 * persistence (as opposed to crashing the client).
 */
            function(t) {
                if ("FirebaseError" === t.name) return t.code === Q.FAILED_PRECONDITION || t.code === Q.UNIMPLEMENTED;
                if ("undefined" != typeof DOMException && t instanceof DOMException) 
                // There are a few known circumstances where we can open IndexedDb but
                // trying to read/write will fail (e.g. quota exceeded). For
                // well-understood cases, we attempt to detect these and then gracefully
                // fall back to memory persistence.
                // NOTE: Rather than continue to add to this list, we could decide to
                // always fall back, with the risk that we might accidentally hide errors
                // representing actual SDK bugs.
                // When the browser is out of quota we could get either quota exceeded
                // or an aborted error depending on whether the error happened during
                // schema migration.
                return 22 === t.code || 20 === t.code || 
                // Firefox Private Browsing mode disables IndexedDb and returns
                // INVALID_STATE for any usage.
                11 === t.code;
                return !0;
            }
            /**
 * Clears the persistent storage. This includes pending writes and cached
 * documents.
 *
 * Must be called while the {@link Firestore} instance is not started (after the app is
 * terminated or when the app is first initialized). On startup, this function
 * must be called before other functions (other than {@link
 * initializeFirestore} or {@link getFirestore})). If the {@link Firestore}
 * instance is still running, the promise will be rejected with the error code
 * of `failed-precondition`.
 *
 * Note: `clearIndexedDbPersistence()` is primarily intended to help write
 * reliable tests that use Cloud Firestore. It uses an efficient mechanism for
 * dropping existing data but does not attempt to securely overwrite or
 * otherwise make cached data unrecoverable. For applications that are sensitive
 * to the disclosure of cached data in between user sessions, we strongly
 * recommend not enabling persistence at all.
 *
 * @param firestore - The {@link Firestore} instance to clear persistence for.
 * @returns A `Promise` that is resolved when the persistent storage is
 * cleared. Otherwise, the promise is rejected with an error.
 */ (t)) throw t;
            console.warn("Error enabling offline persistence. Falling back to persistence disabled: " + t), 
            s.reject(t);
        }
    })).then((() => s.promise));
}

function $c(t) {
    if (t._initialized && !t._terminated) throw new j(Q.FAILED_PRECONDITION, "Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");
    const e = new W;
    return t._queue.enqueueAndForgetEvenWhileRestricted((async () => {
        try {
            await async function(t) {
                if (!Ai.vt()) return Promise.resolve();
                const e = t + "main";
                await Ai.delete(e);
            }(to(t._databaseId, t._persistenceKey)), e.resolve();
        } catch (t) {
            e.reject(t);
        }
    })), e.promise;
}

/**
 * Waits until all currently pending writes for the active user have been
 * acknowledged by the backend.
 *
 * The returned promise resolves immediately if there are no outstanding writes.
 * Otherwise, the promise waits for all previously issued writes (including
 * those written in a previous app session), but it does not wait for writes
 * that were added after the function is called. If you want to wait for
 * additional writes, call `waitForPendingWrites()` again.
 *
 * Any outstanding `waitForPendingWrites()` promises are rejected during user
 * changes.
 *
 * @returns A `Promise` which resolves when all currently pending writes have been
 * acknowledged by the backend.
 */ function Bc(t) {
    return function(t) {
        const e = new W;
        return t.asyncQueue.enqueueAndForget((async () => ca(await Ha(t), e))), e.promise;
    }(Nc(t = dc(t, Dc)));
}

/**
 * Re-enables use of the network for this {@link Firestore} instance after a prior
 * call to {@link disableNetwork}.
 *
 * @returns A `Promise` that is resolved once the network has been enabled.
 */ function Lc(t) {
    return Ya(Nc(t = dc(t, Dc)));
}

/**
 * Disables network usage for this instance. It can be re-enabled via {@link
 * enableNetwork}. While the network is disabled, any snapshot listeners,
 * `getDoc()` or `getDocs()` calls will return results from cache, and any write
 * operations will be queued until the network is restored.
 *
 * @returns A `Promise` that is resolved once the network has been disabled.
 */ function Uc(t) {
    return Xa(Nc(t = dc(t, Dc)));
}

/**
 * Terminates the provided {@link Firestore} instance.
 *
 * After calling `terminate()` only the `clearIndexedDbPersistence()` function
 * may be used. Any other function will throw a `FirestoreError`.
 *
 * To restart after termination, create a new instance of FirebaseFirestore with
 * {@link getFirestore}.
 *
 * Termination does not cancel any pending writes, and any promises that are
 * awaiting a response from the server will not be resolved. If you have
 * persistence enabled, the next time you start this instance, it will resume
 * sending these writes to the server.
 *
 * Note: Under normal circumstances, calling `terminate()` is not required. This
 * function is useful only when you want to force this instance to release all
 * of its resources or in combination with `clearIndexedDbPersistence()` to
 * ensure that all local state is destroyed between test runs.
 *
 * @returns A `Promise` that is resolved when the instance has been successfully
 * terminated.
 */ function qc(t) {
    return e(t.app, "firestore"), t._delete();
}

/**
 * Loads a Firestore bundle into the local cache.
 *
 * @param firestore - The {@link Firestore} instance to load bundles for.
 * @param bundleData - An object representing the bundle to be loaded. Valid
 * objects are `ArrayBuffer`, `ReadableStream<Uint8Array>` or `string`.
 *
 * @returns A `LoadBundleTask` object, which notifies callers with progress
 * updates, and completion or error events. It can be used as a
 * `Promise<LoadBundleTaskProgress>`.
 */ function Kc(t, e) {
    const n = Nc(t = dc(t, Dc)), s = new vc;
    return rc(n, t._databaseId, e, s), s;
}

/**
 * Reads a Firestore {@link Query} from local cache, identified by the given
 * name.
 *
 * The named queries are packaged  into bundles on the server side (along
 * with resulting documents), and loaded to local cache using `loadBundle`. Once
 * in local cache, use this method to extract a {@link Query} by name.
 *
 * @param firestore - The {@link Firestore} instance to read the query from.
 * @param name - The name of the query.
 * @returns A `Promise` that is resolved with the Query or `null`.
 */ function Gc(t, e) {
    return oc(Nc(t = dc(t, Dc)), e).then((e => e ? new pc(t, null, e.query) : null));
}

function Qc(t) {
    if (t._initialized || t._terminated) throw new j(Q.FAILED_PRECONDITION, "Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A `FieldPath` refers to a field in a document. The path may consist of a
 * single field name (referring to a top-level field in the document), or a
 * list of field names (referring to a nested field in the document).
 *
 * Create a `FieldPath` by providing field names. If more than one field
 * name is provided, the path will point to a nested field in a document.
 */
class jc {
    /**
     * Creates a `FieldPath` from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames - A list of field names.
     */
    constructor(...t) {
        for (let e = 0; e < t.length; ++e) if (0 === t[e].length) throw new j(Q.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
        this._internalPath = new gt(t);
    }
    /**
     * Returns true if this `FieldPath` is equal to the provided one.
     *
     * @param other - The `FieldPath` to compare against.
     * @returns true if this `FieldPath` is equal to the provided one.
     */    isEqual(t) {
        return this._internalPath.isEqual(t._internalPath);
    }
}

/**
 * Returns a special sentinel `FieldPath` to refer to the ID of a document.
 * It can be used in queries to sort or filter by the document ID.
 */ function Wc() {
    return new jc("__name__");
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An immutable object representing an array of bytes.
 */ class zc {
    /** @hideconstructor */
    constructor(t) {
        this._byteString = t;
    }
    /**
     * Creates a new `Bytes` object from the given Base64 string, converting it to
     * bytes.
     *
     * @param base64 - The Base64 string used to create the `Bytes` object.
     */    static fromBase64String(t) {
        try {
            return new zc(Tt.fromBase64String(t));
        } catch (t) {
            throw new j(Q.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + t);
        }
    }
    /**
     * Creates a new `Bytes` object from the given Uint8Array.
     *
     * @param array - The Uint8Array used to create the `Bytes` object.
     */    static fromUint8Array(t) {
        return new zc(Tt.fromUint8Array(t));
    }
    /**
     * Returns the underlying bytes as a Base64-encoded string.
     *
     * @returns The Base64-encoded string created from the `Bytes` object.
     */    toBase64() {
        return this._byteString.toBase64();
    }
    /**
     * Returns the underlying bytes in a new `Uint8Array`.
     *
     * @returns The Uint8Array created from the `Bytes` object.
     */    toUint8Array() {
        return this._byteString.toUint8Array();
    }
    /**
     * Returns a string representation of the `Bytes` object.
     *
     * @returns A string representation of the `Bytes` object.
     */    toString() {
        return "Bytes(base64: " + this.toBase64() + ")";
    }
    /**
     * Returns true if this `Bytes` object is equal to the provided one.
     *
     * @param other - The `Bytes` object to compare against.
     * @returns true if this `Bytes` object is equal to the provided one.
     */    isEqual(t) {
        return this._byteString.isEqual(t._byteString);
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Sentinel values that can be used when writing document fields with `set()`
 * or `update()`.
 */ class Hc {
    /**
     * @param _methodName - The public API endpoint that returns this class.
     * @hideconstructor
     */
    constructor(t) {
        this._methodName = t;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An immutable object representing a geographic location in Firestore. The
 * location is represented as latitude/longitude pair.
 *
 * Latitude values are in the range of [-90, 90].
 * Longitude values are in the range of [-180, 180].
 */ class Jc {
    /**
     * Creates a new immutable `GeoPoint` object with the provided latitude and
     * longitude values.
     * @param latitude - The latitude as number between -90 and 90.
     * @param longitude - The longitude as number between -180 and 180.
     */
    constructor(t, e) {
        if (!isFinite(t) || t < -90 || t > 90) throw new j(Q.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + t);
        if (!isFinite(e) || e < -180 || e > 180) throw new j(Q.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + e);
        this._lat = t, this._long = e;
    }
    /**
     * The latitude of this `GeoPoint` instance.
     */    get latitude() {
        return this._lat;
    }
    /**
     * The longitude of this `GeoPoint` instance.
     */    get longitude() {
        return this._long;
    }
    /**
     * Returns true if this `GeoPoint` is equal to the provided one.
     *
     * @param other - The `GeoPoint` to compare against.
     * @returns true if this `GeoPoint` is equal to the provided one.
     */    isEqual(t) {
        return this._lat === t._lat && this._long === t._long;
    }
    /** Returns a JSON-serializable representation of this GeoPoint. */    toJSON() {
        return {
            latitude: this._lat,
            longitude: this._long
        };
    }
    /**
     * Actually private to JS consumers of our API, so this function is prefixed
     * with an underscore.
     */    _compareTo(t) {
        return ot(this._lat, t._lat) || ot(this._long, t._long);
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Yc = /^__.*__$/;

/** The result of parsing document data (e.g. for a setData call). */ class Xc {
    constructor(t, e, n) {
        this.data = t, this.fieldMask = e, this.fieldTransforms = n;
    }
    toMutation(t, e) {
        return null !== this.fieldMask ? new Sn(t, this.data, this.fieldMask, e, this.fieldTransforms) : new vn(t, this.data, e, this.fieldTransforms);
    }
}

/** The result of parsing "update" data (i.e. for an updateData call). */ class Zc {
    constructor(t, 
    // The fieldMask does not include document transforms.
    e, n) {
        this.data = t, this.fieldMask = e, this.fieldTransforms = n;
    }
    toMutation(t, e) {
        return new Sn(t, this.data, this.fieldMask, e, this.fieldTransforms);
    }
}

function th(t) {
    switch (t) {
      case 0 /* Set */ :
 // fall through
              case 2 /* MergeSet */ :
 // fall through
              case 1 /* Update */ :
        return !0;

      case 3 /* Argument */ :
      case 4 /* ArrayArgument */ :
        return !1;

      default:
        throw U();
    }
}

/** A "context" object passed around while parsing user data. */ class eh {
    /**
     * Initializes a ParseContext with the given source and path.
     *
     * @param settings - The settings for the parser.
     * @param databaseId - The database ID of the Firestore instance.
     * @param serializer - The serializer to use to generate the Value proto.
     * @param ignoreUndefinedProperties - Whether to ignore undefined properties
     * rather than throw.
     * @param fieldTransforms - A mutable list of field transforms encountered
     * while parsing the data.
     * @param fieldMask - A mutable list of field paths encountered while parsing
     * the data.
     *
     * TODO(b/34871131): We don't support array paths right now, so path can be
     * null to indicate the context represents any location within an array (in
     * which case certain features will not work and errors will be somewhat
     * compromised).
     */
    constructor(t, e, n, s, i, r) {
        this.settings = t, this.databaseId = e, this.M = n, this.ignoreUndefinedProperties = s, 
        // Minor hack: If fieldTransforms is undefined, we assume this is an
        // external call and we need to validate the entire path.
        void 0 === i && this.Ya(), this.fieldTransforms = i || [], this.fieldMask = r || [];
    }
    get path() {
        return this.settings.path;
    }
    get Xa() {
        return this.settings.Xa;
    }
    /** Returns a new context with the specified settings overwritten. */    Za(t) {
        return new eh(Object.assign(Object.assign({}, this.settings), t), this.databaseId, this.M, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask);
    }
    tc(t) {
        var e;
        const n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), s = this.Za({
            path: n,
            ec: !1
        });
        return s.nc(t), s;
    }
    sc(t) {
        var e;
        const n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), s = this.Za({
            path: n,
            ec: !1
        });
        return s.Ya(), s;
    }
    ic(t) {
        // TODO(b/34871131): We don't support array paths right now; so make path
        // undefined.
        return this.Za({
            path: void 0,
            ec: !0
        });
    }
    rc(t) {
        return Th(t, this.settings.methodName, this.settings.oc || !1, this.path, this.settings.uc);
    }
    /** Returns 'true' if 'fieldPath' was traversed when creating this context. */    contains(t) {
        return void 0 !== this.fieldMask.find((e => t.isPrefixOf(e))) || void 0 !== this.fieldTransforms.find((e => t.isPrefixOf(e.field)));
    }
    Ya() {
        // TODO(b/34871131): Remove null check once we have proper paths for fields
        // within arrays.
        if (this.path) for (let t = 0; t < this.path.length; t++) this.nc(this.path.get(t));
    }
    nc(t) {
        if (0 === t.length) throw this.rc("Document fields must not be empty");
        if (th(this.Xa) && Yc.test(t)) throw this.rc('Document fields cannot begin and end with "__"');
    }
}

/**
 * Helper for parsing raw user input (provided via the API) into internal model
 * classes.
 */ class nh {
    constructor(t, e, n) {
        this.databaseId = t, this.ignoreUndefinedProperties = e, this.M = n || Ho(t);
    }
    /** Creates a new top-level parse context. */    ac(t, e, n, s = !1) {
        return new eh({
            Xa: t,
            methodName: e,
            uc: n,
            path: gt.emptyPath(),
            ec: !1,
            oc: s
        }, this.databaseId, this.M, this.ignoreUndefinedProperties);
    }
}

function sh(t) {
    const e = t._freezeSettings(), n = Ho(t._databaseId);
    return new nh(t._databaseId, !!e.ignoreUndefinedProperties, n);
}

/** Parse document data from a set() call. */ function ih(t, e, n, s, i, r = {}) {
    const o = t.ac(r.merge || r.mergeFields ? 2 /* MergeSet */ : 0 /* Set */ , e, n, i);
    gh("Data must be an object, but it was:", o, s);
    const u = wh(s, o);
    let a, c;
    if (r.merge) a = new yt(o.fieldMask), c = o.fieldTransforms; else if (r.mergeFields) {
        const t = [];
        for (const s of r.mergeFields) {
            const i = yh(e, s, n);
            if (!o.contains(i)) throw new j(Q.INVALID_ARGUMENT, `Field '${i}' is specified in your field mask but missing from your input data.`);
            Eh(t, i) || t.push(i);
        }
        a = new yt(t), c = o.fieldTransforms.filter((t => a.covers(t.field)));
    } else a = null, c = o.fieldTransforms;
    return new Xc(new ne(u), a, c);
}

class rh extends Hc {
    _toFieldTransform(t) {
        if (2 /* MergeSet */ !== t.Xa) throw 1 /* Update */ === t.Xa ? t.rc(`${this._methodName}() can only appear at the top level of your update data`) : t.rc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);
        // No transform to add for a delete, but we need to add it to our
        // fieldMask so it gets deleted.
        return t.fieldMask.push(t.path), null;
    }
    isEqual(t) {
        return t instanceof rh;
    }
}

/**
 * Creates a child context for parsing SerializableFieldValues.
 *
 * This is different than calling `ParseContext.contextWith` because it keeps
 * the fieldTransforms and fieldMask separate.
 *
 * The created context has its `dataSource` set to `UserDataSource.Argument`.
 * Although these values are used with writes, any elements in these FieldValues
 * are not considered writes since they cannot contain any FieldValue sentinels,
 * etc.
 *
 * @param fieldValue - The sentinel FieldValue for which to create a child
 *     context.
 * @param context - The parent context.
 * @param arrayElement - Whether or not the FieldValue has an array.
 */ function oh(t, e, n) {
    return new eh({
        Xa: 3 /* Argument */ ,
        uc: e.settings.uc,
        methodName: t._methodName,
        ec: n
    }, e.databaseId, e.M, e.ignoreUndefinedProperties);
}

class uh extends Hc {
    _toFieldTransform(t) {
        return new gn(t.path, new cn);
    }
    isEqual(t) {
        return t instanceof uh;
    }
}

class ah extends Hc {
    constructor(t, e) {
        super(t), this.cc = e;
    }
    _toFieldTransform(t) {
        const e = oh(this, t, 
        /*array=*/ !0), n = this.cc.map((t => _h(t, e))), s = new hn(n);
        return new gn(t.path, s);
    }
    isEqual(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }
}

class ch extends Hc {
    constructor(t, e) {
        super(t), this.cc = e;
    }
    _toFieldTransform(t) {
        const e = oh(this, t, 
        /*array=*/ !0), n = this.cc.map((t => _h(t, e))), s = new fn(n);
        return new gn(t.path, s);
    }
    isEqual(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }
}

class hh extends Hc {
    constructor(t, e) {
        super(t), this.hc = e;
    }
    _toFieldTransform(t) {
        const e = new _n(t.M, sn(t.M, this.hc));
        return new gn(t.path, e);
    }
    isEqual(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }
}

/** Parse update data from an update() call. */ function lh(t, e, n, s) {
    const i = t.ac(1 /* Update */ , e, n);
    gh("Data must be an object, but it was:", i, s);
    const r = [], o = ne.empty();
    ft(s, ((t, s) => {
        const u = Ih(e, t, n);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                s = I(s);
        const a = i.sc(u);
        if (s instanceof rh) 
        // Add it to the field mask, but don't add anything to updateData.
        r.push(u); else {
            const t = _h(s, a);
            null != t && (r.push(u), o.set(u, t));
        }
    }));
    const u = new yt(r);
    return new Zc(o, u, i.fieldTransforms);
}

/** Parse update data from a list of field/value arguments. */ function fh(t, e, n, s, i, r) {
    const o = t.ac(1 /* Update */ , e, n), u = [ yh(e, s, n) ], a = [ i ];
    if (r.length % 2 != 0) throw new j(Q.INVALID_ARGUMENT, `Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);
    for (let t = 0; t < r.length; t += 2) u.push(yh(e, r[t])), a.push(r[t + 1]);
    const c = [], h = ne.empty();
    // We iterate in reverse order to pick the last value for a field if the
    // user specified the field multiple times.
    for (let t = u.length - 1; t >= 0; --t) if (!Eh(c, u[t])) {
        const e = u[t];
        let n = a[t];
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                n = I(n);
        const s = o.sc(e);
        if (n instanceof rh) 
        // Add it to the field mask, but don't add anything to updateData.
        c.push(e); else {
            const t = _h(n, s);
            null != t && (c.push(e), h.set(e, t));
        }
    }
    const l = new yt(c);
    return new Zc(h, l, o.fieldTransforms);
}

/**
 * Parse a "query value" (e.g. value in a where filter or a value in a cursor
 * bound).
 *
 * @param allowArrays - Whether the query value is an array that may directly
 * contain additional arrays (e.g. the operand of an `in` query).
 */ function dh(t, e, n, s = !1) {
    return _h(n, t.ac(s ? 4 /* ArrayArgument */ : 3 /* Argument */ , e));
}

/**
 * Parses user data to Protobuf Values.
 *
 * @param input - Data to be parsed.
 * @param context - A context object representing the current path being parsed,
 * the source of the data being parsed, etc.
 * @returns The parsed value, or null if the value was a FieldValue sentinel
 * that should not be included in the resulting parsed data.
 */ function _h(t, e) {
    if (mh(
    // Unwrap the API type from the Compat SDK. This will return the API type
    // from firestore-exp.
    t = I(t))) return gh("Unsupported field value:", e, t), wh(t, e);
    if (t instanceof Hc) 
    // FieldValues usually parse into transforms (except deleteField())
    // in which case we do not want to include this field in our parsed data
    // (as doing so will overwrite the field directly prior to the transform
    // trying to transform it). So we don't add this location to
    // context.fieldMask and we return null as our parsing result.
    /**
 * "Parses" the provided FieldValueImpl, adding any necessary transforms to
 * context.fieldTransforms.
 */
    return function(t, e) {
        // Sentinels are only supported with writes, and not within arrays.
        if (!th(e.Xa)) throw e.rc(`${t._methodName}() can only be used with update() and set()`);
        if (!e.path) throw e.rc(`${t._methodName}() is not currently supported inside arrays`);
        const n = t._toFieldTransform(e);
        n && e.fieldTransforms.push(n);
    }
    /**
 * Helper to parse a scalar value (i.e. not an Object, Array, or FieldValue)
 *
 * @returns The parsed value
 */ (t, e), null;
    if (void 0 === t && e.ignoreUndefinedProperties) 
    // If the input is undefined it can never participate in the fieldMask, so
    // don't handle this below. If `ignoreUndefinedProperties` is false,
    // `parseScalarValue` will reject an undefined value.
    return null;
    if (
    // If context.path is null we are inside an array and we don't support
    // field mask paths more granular than the top-level array.
    e.path && e.fieldMask.push(e.path), t instanceof Array) {
        // TODO(b/34871131): Include the path containing the array in the error
        // message.
        // In the case of IN queries, the parsed data is an array (representing
        // the set of values to be included for the IN query) that may directly
        // contain additional arrays (each representing an individual field
        // value), so we disable this validation.
        if (e.settings.ec && 4 /* ArrayArgument */ !== e.Xa) throw e.rc("Nested arrays are not supported");
        return function(t, e) {
            const n = [];
            let s = 0;
            for (const i of t) {
                let t = _h(i, e.ic(s));
                null == t && (
                // Just include nulls in the array for fields being replaced with a
                // sentinel.
                t = {
                    nullValue: "NULL_VALUE"
                }), n.push(t), s++;
            }
            return {
                arrayValue: {
                    values: n
                }
            };
        }(t, e);
    }
    return function(t, e) {
        if (null === (t = I(t))) return {
            nullValue: "NULL_VALUE"
        };
        if ("number" == typeof t) return sn(e.M, t);
        if ("boolean" == typeof t) return {
            booleanValue: t
        };
        if ("string" == typeof t) return {
            stringValue: t
        };
        if (t instanceof Date) {
            const n = ct.fromDate(t);
            return {
                timestampValue: ws(e.M, n)
            };
        }
        if (t instanceof ct) {
            // Firestore backend truncates precision down to microseconds. To ensure
            // offline mode works the same with regards to truncation, perform the
            // truncation immediately without waiting for the backend to do that.
            const n = new ct(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));
            return {
                timestampValue: ws(e.M, n)
            };
        }
        if (t instanceof Jc) return {
            geoPointValue: {
                latitude: t.latitude,
                longitude: t.longitude
            }
        };
        if (t instanceof zc) return {
            bytesValue: ms(e.M, t._byteString)
        };
        if (t instanceof yc) {
            const n = e.databaseId, s = t.firestore._databaseId;
            if (!s.isEqual(n)) throw e.rc(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${n.projectId}/${n.database}`);
            return {
                referenceValue: ps(t.firestore._databaseId || e.databaseId, t._key.path)
            };
        }
        throw e.rc(`Unsupported field value: ${fc(t)}`);
    }
    /**
 * Checks whether an object looks like a JSON object that should be converted
 * into a struct. Normal class/prototype instances are considered to look like
 * JSON objects since they should be converted to a struct value. Arrays, Dates,
 * GeoPoints, etc. are not considered to look like JSON objects since they map
 * to specific FieldValue types other than ObjectValue.
 */ (t, e);
}

function wh(t, e) {
    const n = {};
    return dt(t) ? 
    // If we encounter an empty object, we explicitly add it to the update
    // mask to ensure that the server creates a map entry.
    e.path && e.path.length > 0 && e.fieldMask.push(e.path) : ft(t, ((t, s) => {
        const i = _h(s, e.tc(t));
        null != i && (n[t] = i);
    })), {
        mapValue: {
            fields: n
        }
    };
}

function mh(t) {
    return !("object" != typeof t || null === t || t instanceof Array || t instanceof Date || t instanceof ct || t instanceof Jc || t instanceof zc || t instanceof yc || t instanceof Hc);
}

function gh(t, e, n) {
    if (!mh(n) || !function(t) {
        return "object" == typeof t && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t));
    }(n)) {
        const s = fc(n);
        throw "an object" === s ? e.rc(t + " a custom object") : e.rc(t + " " + s);
    }
}

/**
 * Helper that calls fromDotSeparatedString() but wraps any error thrown.
 */ function yh(t, e, n) {
    if ((
    // If required, replace the FieldPath Compat class with with the firestore-exp
    // FieldPath.
    e = I(e)) instanceof jc) return e._internalPath;
    if ("string" == typeof e) return Ih(t, e);
    throw Th("Field path arguments must be of type string or ", t, 
    /* hasConverter= */ !1, 
    /* path= */ void 0, n);
}

/**
 * Matches any characters in a field path string that are reserved.
 */ const ph = new RegExp("[~\\*/\\[\\]]");

/**
 * Wraps fromDotSeparatedString with an error message about the method that
 * was thrown.
 * @param methodName - The publicly visible method name
 * @param path - The dot-separated string form of a field path which will be
 * split on dots.
 * @param targetDoc - The document against which the field path will be
 * evaluated.
 */ function Ih(t, e, n) {
    if (e.search(ph) >= 0) throw Th(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`, t, 
    /* hasConverter= */ !1, 
    /* path= */ void 0, n);
    try {
        return new jc(...e.split("."))._internalPath;
    } catch (s) {
        throw Th(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`, t, 
        /* hasConverter= */ !1, 
        /* path= */ void 0, n);
    }
}

function Th(t, e, n, s, i) {
    const r = s && !s.isEmpty(), o = void 0 !== i;
    let u = `Function ${e}() called with invalid data`;
    n && (u += " (via `toFirestore()`)"), u += ". ";
    let a = "";
    return (r || o) && (a += " (found", r && (a += ` in field ${s}`), o && (a += ` in document ${i}`), 
    a += ")"), new j(Q.INVALID_ARGUMENT, u + t + a);
}

/** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */ function Eh(t, e) {
    return t.some((t => t.isEqual(e)));
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A `DocumentSnapshot` contains data read from a document in your Firestore
 * database. The data can be extracted with `.data()` or `.get(<field>)` to
 * get a specific field.
 *
 * For a `DocumentSnapshot` that points to a non-existing document, any data
 * access will return 'undefined'. You can use the `exists()` method to
 * explicitly verify a document's existence.
 */ class Ah {
    // Note: This class is stripped down version of the DocumentSnapshot in
    // the legacy SDK. The changes are:
    // - No support for SnapshotMetadata.
    // - No support for SnapshotOptions.
    /** @hideconstructor protected */
    constructor(t, e, n, s, i) {
        this._firestore = t, this._userDataWriter = e, this._key = n, this._document = s, 
        this._converter = i;
    }
    /** Property of the `DocumentSnapshot` that provides the document's ID. */    get id() {
        return this._key.path.lastSegment();
    }
    /**
     * The `DocumentReference` for the document included in the `DocumentSnapshot`.
     */    get ref() {
        return new yc(this._firestore, this._converter, this._key);
    }
    /**
     * Signals whether or not the document at the snapshot's location exists.
     *
     * @returns true if the document exists.
     */    exists() {
        return null !== this._document;
    }
    /**
     * Retrieves all fields in the document as an `Object`. Returns `undefined` if
     * the document doesn't exist.
     *
     * @returns An `Object` containing all fields in the document or `undefined`
     * if the document doesn't exist.
     */    data() {
        if (this._document) {
            if (this._converter) {
                // We only want to use the converter and create a new DocumentSnapshot
                // if a converter has been provided.
                const t = new Rh(this._firestore, this._userDataWriter, this._key, this._document, 
                /* converter= */ null);
                return this._converter.fromFirestore(t);
            }
            return this._userDataWriter.convertValue(this._document.data.value);
        }
    }
    /**
     * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
     * document or field doesn't exist.
     *
     * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
     * field.
     * @returns The data at the specified field location or undefined if no such
     * field exists in the document.
     */
    // We are using `any` here to avoid an explicit cast by our users.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(t) {
        if (this._document) {
            const e = this._document.data.field(Ph("DocumentSnapshot.get", t));
            if (null !== e) return this._userDataWriter.convertValue(e);
        }
    }
}

/**
 * A `QueryDocumentSnapshot` contains data read from a document in your
 * Firestore database as part of a query. The document is guaranteed to exist
 * and its data can be extracted with `.data()` or `.get(<field>)` to get a
 * specific field.
 *
 * A `QueryDocumentSnapshot` offers the same API surface as a
 * `DocumentSnapshot`. Since query results contain only existing documents, the
 * `exists` property will always be true and `data()` will never return
 * 'undefined'.
 */ class Rh extends Ah {
    /**
     * Retrieves all fields in the document as an `Object`.
     *
     * @override
     * @returns An `Object` containing all fields in the document.
     */
    data() {
        return super.data();
    }
}

/**
 * Helper that calls `fromDotSeparatedString()` but wraps any error thrown.
 */ function Ph(t, e) {
    return "string" == typeof e ? Ih(t, e) : e instanceof jc ? e._internalPath : e._delegate._internalPath;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Metadata about a snapshot, describing the state of the snapshot.
 */ class bh {
    /** @hideconstructor */
    constructor(t, e) {
        this.hasPendingWrites = t, this.fromCache = e;
    }
    /**
     * Returns true if this `SnapshotMetadata` is equal to the provided one.
     *
     * @param other - The `SnapshotMetadata` to compare against.
     * @returns true if this `SnapshotMetadata` is equal to the provided one.
     */    isEqual(t) {
        return this.hasPendingWrites === t.hasPendingWrites && this.fromCache === t.fromCache;
    }
}

/**
 * A `DocumentSnapshot` contains data read from a document in your Firestore
 * database. The data can be extracted with `.data()` or `.get(<field>)` to
 * get a specific field.
 *
 * For a `DocumentSnapshot` that points to a non-existing document, any data
 * access will return 'undefined'. You can use the `exists()` method to
 * explicitly verify a document's existence.
 */ class Vh extends Ah {
    /** @hideconstructor protected */
    constructor(t, e, n, s, i, r) {
        super(t, e, n, s, r), this._firestore = t, this._firestoreImpl = t, this.metadata = i;
    }
    /**
     * Returns whether or not the data exists. True if the document exists.
     */    exists() {
        return super.exists();
    }
    /**
     * Retrieves all fields in the document as an `Object`. Returns `undefined` if
     * the document doesn't exist.
     *
     * By default, `serverTimestamp()` values that have not yet been
     * set to their final value will be returned as `null`. You can override
     * this by passing an options object.
     *
     * @param options - An options object to configure how data is retrieved from
     * the snapshot (for example the desired behavior for server timestamps that
     * have not yet been set to their final value).
     * @returns An `Object` containing all fields in the document or `undefined` if
     * the document doesn't exist.
     */    data(t = {}) {
        if (this._document) {
            if (this._converter) {
                // We only want to use the converter and create a new DocumentSnapshot
                // if a converter has been provided.
                const e = new vh(this._firestore, this._userDataWriter, this._key, this._document, this.metadata, 
                /* converter= */ null);
                return this._converter.fromFirestore(e, t);
            }
            return this._userDataWriter.convertValue(this._document.data.value, t.serverTimestamps);
        }
    }
    /**
     * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
     * document or field doesn't exist.
     *
     * By default, a `serverTimestamp()` that has not yet been set to
     * its final value will be returned as `null`. You can override this by
     * passing an options object.
     *
     * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
     * field.
     * @param options - An options object to configure how the field is retrieved
     * from the snapshot (for example the desired behavior for server timestamps
     * that have not yet been set to their final value).
     * @returns The data at the specified field location or undefined if no such
     * field exists in the document.
     */
    // We are using `any` here to avoid an explicit cast by our users.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(t, e = {}) {
        if (this._document) {
            const n = this._document.data.field(Ph("DocumentSnapshot.get", t));
            if (null !== n) return this._userDataWriter.convertValue(n, e.serverTimestamps);
        }
    }
}

/**
 * A `QueryDocumentSnapshot` contains data read from a document in your
 * Firestore database as part of a query. The document is guaranteed to exist
 * and its data can be extracted with `.data()` or `.get(<field>)` to get a
 * specific field.
 *
 * A `QueryDocumentSnapshot` offers the same API surface as a
 * `DocumentSnapshot`. Since query results contain only existing documents, the
 * `exists` property will always be true and `data()` will never return
 * 'undefined'.
 */ class vh extends Vh {
    /**
     * Retrieves all fields in the document as an `Object`.
     *
     * By default, `serverTimestamp()` values that have not yet been
     * set to their final value will be returned as `null`. You can override
     * this by passing an options object.
     *
     * @override
     * @param options - An options object to configure how data is retrieved from
     * the snapshot (for example the desired behavior for server timestamps that
     * have not yet been set to their final value).
     * @returns An `Object` containing all fields in the document.
     */
    data(t = {}) {
        return super.data(t);
    }
}

/**
 * A `QuerySnapshot` contains zero or more `DocumentSnapshot` objects
 * representing the results of a query. The documents can be accessed as an
 * array via the `docs` property or enumerated using the `forEach` method. The
 * number of documents can be determined via the `empty` and `size`
 * properties.
 */ class Sh {
    /** @hideconstructor */
    constructor(t, e, n, s) {
        this._firestore = t, this._userDataWriter = e, this._snapshot = s, this.metadata = new bh(s.hasPendingWrites, s.fromCache), 
        this.query = n;
    }
    /** An array of all the documents in the `QuerySnapshot`. */    get docs() {
        const t = [];
        return this.forEach((e => t.push(e))), t;
    }
    /** The number of documents in the `QuerySnapshot`. */    get size() {
        return this._snapshot.docs.size;
    }
    /** True if there are no documents in the `QuerySnapshot`. */    get empty() {
        return 0 === this.size;
    }
    /**
     * Enumerates all of the documents in the `QuerySnapshot`.
     *
     * @param callback - A callback to be called with a `QueryDocumentSnapshot` for
     * each document in the snapshot.
     * @param thisArg - The `this` binding for the callback.
     */    forEach(t, e) {
        this._snapshot.docs.forEach((n => {
            t.call(e, new vh(this._firestore, this._userDataWriter, n.key, n, new bh(this._snapshot.mutatedKeys.has(n.key), this._snapshot.fromCache), this.query.converter));
        }));
    }
    /**
     * Returns an array of the documents changes since the last snapshot. If this
     * is the first snapshot, all documents will be in the list as 'added'
     * changes.
     *
     * @param options - `SnapshotListenOptions` that control whether metadata-only
     * changes (i.e. only `DocumentSnapshot.metadata` changed) should trigger
     * snapshot events.
     */    docChanges(t = {}) {
        const e = !!t.includeMetadataChanges;
        if (e && this._snapshot.excludesMetadataChanges) throw new j(Q.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
        return this._cachedChanges && this._cachedChangesIncludeMetadataChanges === e || (this._cachedChanges = 
        /** Calculates the array of `DocumentChange`s for a given `ViewSnapshot`. */
        function(t, e) {
            if (t._snapshot.oldDocs.isEmpty()) {
                let e = 0;
                return t._snapshot.docChanges.map((n => ({
                    type: "added",
                    doc: new vh(t._firestore, t._userDataWriter, n.doc.key, n.doc, new bh(t._snapshot.mutatedKeys.has(n.doc.key), t._snapshot.fromCache), t.query.converter),
                    oldIndex: -1,
                    newIndex: e++
                })));
            }
            {
                // A `DocumentSet` that is updated incrementally as changes are applied to use
                // to lookup the index of a document.
                let n = t._snapshot.oldDocs;
                return t._snapshot.docChanges.filter((t => e || 3 /* Metadata */ !== t.type)).map((e => {
                    const s = new vh(t._firestore, t._userDataWriter, e.doc.key, e.doc, new bh(t._snapshot.mutatedKeys.has(e.doc.key), t._snapshot.fromCache), t.query.converter);
                    let i = -1, r = -1;
                    return 0 /* Added */ !== e.type && (i = n.indexOf(e.doc.key), n = n.delete(e.doc.key)), 
                    1 /* Removed */ !== e.type && (n = n.add(e.doc), r = n.indexOf(e.doc.key)), {
                        type: Dh(e.type),
                        doc: s,
                        oldIndex: i,
                        newIndex: r
                    };
                }));
            }
        }(this, e), this._cachedChangesIncludeMetadataChanges = e), this._cachedChanges;
    }
}

function Dh(t) {
    switch (t) {
      case 0 /* Added */ :
        return "added";

      case 2 /* Modified */ :
      case 3 /* Metadata */ :
        return "modified";

      case 1 /* Removed */ :
        return "removed";

      default:
        return U();
    }
}

// TODO(firestoreexp): Add tests for snapshotEqual with different snapshot
// metadata
/**
 * Returns true if the provided snapshots are equal.
 *
 * @param left - A snapshot to compare.
 * @param right - A snapshot to compare.
 * @returns true if the snapshots are equal.
 */ function Ch(t, e) {
    return t instanceof Vh && e instanceof Vh ? t._firestore === e._firestore && t._key.isEqual(e._key) && (null === t._document ? null === e._document : t._document.isEqual(e._document)) && t._converter === e._converter : t instanceof Sh && e instanceof Sh && (t._firestore === e._firestore && Pc(t.query, e.query) && t.metadata.isEqual(e.metadata) && t._snapshot.isEqual(e._snapshot));
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function xh(t) {
    if (Ue(t) && 0 === t.explicitOrderBy.length) throw new j(Q.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
}

/**
 * A `QueryConstraint` is used to narrow the set of documents returned by a
 * Firestore query. `QueryConstraint`s are created by invoking {@link where},
 * {@link orderBy}, {@link (startAt:1)}, {@link (startAfter:1)}, {@link
 * endBefore:1}, {@link (endAt:1)}, {@link limit} or {@link limitToLast} and
 * can then be passed to {@link query} to create a new query instance that
 * also contains this `QueryConstraint`.
 */ class Nh {}

/**
 * Creates a new immutable instance of {@link Query} that is extended to also include
 * additional query constraints.
 *
 * @param query - The {@link Query} instance to use as a base for the new constraints.
 * @param queryConstraints - The list of {@link QueryConstraint}s to apply.
 * @throws if any of the provided query constraints cannot be combined with the
 * existing or new constraints.
 */ function kh(t, ...e) {
    for (const n of e) t = n._apply(t);
    return t;
}

class Mh extends Nh {
    constructor(t, e, n) {
        super(), this.lc = t, this.fc = e, this.dc = n, this.type = "where";
    }
    _apply(t) {
        const e = sh(t.firestore), n = function(t, e, n, s, i, r, o) {
            let u;
            if (i.isKeyField()) {
                if ("array-contains" /* ARRAY_CONTAINS */ === r || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === r) throw new j(Q.INVALID_ARGUMENT, `Invalid Query. You can't perform '${r}' queries on documentId().`);
                if ("in" /* IN */ === r || "not-in" /* NOT_IN */ === r) {
                    Jh(o, r);
                    const e = [];
                    for (const n of o) e.push(Hh(s, t, n));
                    u = {
                        arrayValue: {
                            values: e
                        }
                    };
                } else u = Hh(s, t, o);
            } else "in" /* IN */ !== r && "not-in" /* NOT_IN */ !== r && "array-contains-any" /* ARRAY_CONTAINS_ANY */ !== r || Jh(o, r), 
            u = dh(n, e, o, 
            /* allowArrays= */ "in" /* IN */ === r || "not-in" /* NOT_IN */ === r);
            const a = Ae.create(i, r, u);
            return function(t, e) {
                if (e.S()) {
                    const n = Ke(t);
                    if (null !== n && !n.isEqual(e.field)) throw new j(Q.INVALID_ARGUMENT, `Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${n.toString()}' and '${e.field.toString()}'`);
                    const s = qe(t);
                    null !== s && Yh(t, e.field, s);
                }
                const n = function(t, e) {
                    for (const n of t.filters) if (e.indexOf(n.op) >= 0) return n.op;
                    return null;
                }(t, 
                /**
 * Given an operator, returns the set of operators that cannot be used with it.
 *
 * Operators in a query must adhere to the following set of rules:
 * 1. Only one array operator is allowed.
 * 2. Only one disjunctive operator is allowed.
 * 3. `NOT_EQUAL` cannot be used with another `NOT_EQUAL` operator.
 * 4. `NOT_IN` cannot be used with array, disjunctive, or `NOT_EQUAL` operators.
 *
 * Array operators: `ARRAY_CONTAINS`, `ARRAY_CONTAINS_ANY`
 * Disjunctive operators: `IN`, `ARRAY_CONTAINS_ANY`, `NOT_IN`
 */
                function(t) {
                    switch (t) {
                      case "!=" /* NOT_EQUAL */ :
                        return [ "!=" /* NOT_EQUAL */ , "not-in" /* NOT_IN */ ];

                      case "array-contains" /* ARRAY_CONTAINS */ :
                        return [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "not-in" /* NOT_IN */ ];

                      case "in" /* IN */ :
                        return [ "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "in" /* IN */ , "not-in" /* NOT_IN */ ];

                      case "array-contains-any" /* ARRAY_CONTAINS_ANY */ :
                        return [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "in" /* IN */ , "not-in" /* NOT_IN */ ];

                      case "not-in" /* NOT_IN */ :
                        return [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "in" /* IN */ , "not-in" /* NOT_IN */ , "!=" /* NOT_EQUAL */ ];

                      default:
                        return [];
                    }
                }(e.op));
                if (null !== n) 
                // Special case when it's a duplicate op to give a slightly clearer error message.
                throw n === e.op ? new j(Q.INVALID_ARGUMENT, `Invalid query. You cannot use more than one '${e.op.toString()}' filter.`) : new j(Q.INVALID_ARGUMENT, `Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`);
            }(t, a), a;
        }(t._query, "where", e, t.firestore._databaseId, this.lc, this.fc, this.dc);
        return new pc(t.firestore, t.converter, function(t, e) {
            const n = t.filters.concat([ e ]);
            return new Fe(t.path, t.collectionGroup, t.explicitOrderBy.slice(), n, t.limit, t.limitType, t.startAt, t.endAt);
        }(t._query, n));
    }
}

/**
 * Creates a {@link QueryConstraint} that enforces that documents must contain the
 * specified field and that the value should satisfy the relation constraint
 * provided.
 *
 * @param fieldPath - The path to compare
 * @param opStr - The operation string (e.g "&lt;", "&lt;=", "==", "&lt;",
 *   "&lt;=", "!=").
 * @param value - The value for comparison
 * @returns The created {@link Query}.
 */ function Oh(t, e, n) {
    const s = e, i = Ph("where", t);
    return new Mh(i, s, n);
}

class Fh extends Nh {
    constructor(t, e) {
        super(), this.lc = t, this._c = e, this.type = "orderBy";
    }
    _apply(t) {
        const e = function(t, e, n) {
            if (null !== t.startAt) throw new j(Q.INVALID_ARGUMENT, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
            if (null !== t.endAt) throw new j(Q.INVALID_ARGUMENT, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
            const s = new Ne(e, n);
            return function(t, e) {
                if (null === qe(t)) {
                    // This is the first order by. It must match any inequality.
                    const n = Ke(t);
                    null !== n && Yh(t, n, e.field);
                }
            }(t, s), s;
        }
        /**
 * Create a `Bound` from a query and a document.
 *
 * Note that the `Bound` will always include the key of the document
 * and so only the provided document will compare equal to the returned
 * position.
 *
 * Will throw if the document does not contain all fields of the order by
 * of the query or if any of the fields in the order by are an uncommitted
 * server timestamp.
 */ (t._query, this.lc, this._c);
        return new pc(t.firestore, t.converter, function(t, e) {
            // TODO(dimond): validate that orderBy does not list the same key twice.
            const n = t.explicitOrderBy.concat([ e ]);
            return new Fe(t.path, t.collectionGroup, n, t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt);
        }(t._query, e));
    }
}

/**
 * Creates a {@link QueryConstraint} that sorts the query result by the
 * specified field, optionally in descending order instead of ascending.
 *
 * @param fieldPath - The field to sort by.
 * @param directionStr - Optional direction to sort by ('asc' or 'desc'). If
 * not specified, order will be ascending.
 * @returns The created {@link Query}.
 */ function $h(t, e = "asc") {
    const n = e, s = Ph("orderBy", t);
    return new Fh(s, n);
}

class Bh extends Nh {
    constructor(t, e, n) {
        super(), this.type = t, this.wc = e, this.mc = n;
    }
    _apply(t) {
        return new pc(t.firestore, t.converter, We(t._query, this.wc, this.mc));
    }
}

/**
 * Creates a {@link QueryConstraint} that only returns the first matching documents.
 *
 * @param limit - The maximum number of items to return.
 * @returns The created {@link Query}.
 */ function Lh(t) {
    return _c("limit", t), new Bh("limit", t, "F" /* First */);
}

/**
 * Creates a {@link QueryConstraint} that only returns the last matching documents.
 *
 * You must specify at least one `orderBy` clause for `limitToLast` queries,
 * otherwise an exception will be thrown during execution.
 *
 * @param limit - The maximum number of items to return.
 * @returns The created {@link Query}.
 */ function Uh(t) {
    return _c("limitToLast", t), new Bh("limitToLast", t, "L" /* Last */);
}

class qh extends Nh {
    constructor(t, e, n) {
        super(), this.type = t, this.gc = e, this.yc = n;
    }
    _apply(t) {
        const e = zh(t, this.type, this.gc, this.yc);
        return new pc(t.firestore, t.converter, function(t, e) {
            return new Fe(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, e, t.endAt);
        }(t._query, e));
    }
}

function Kh(...t) {
    return new qh("startAt", t, 
    /*inclusive=*/ !0);
}

function Gh(...t) {
    return new qh("startAfter", t, 
    /*inclusive=*/ !1);
}

class Qh extends Nh {
    constructor(t, e, n) {
        super(), this.type = t, this.gc = e, this.yc = n;
    }
    _apply(t) {
        const e = zh(t, this.type, this.gc, this.yc);
        return new pc(t.firestore, t.converter, function(t, e) {
            return new Fe(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, e);
        }(t._query, e));
    }
}

function jh(...t) {
    return new Qh("endBefore", t, 
    /*inclusive=*/ !1);
}

function Wh(...t) {
    return new Qh("endAt", t, /*inclusive=*/ !0);
}

/** Helper function to create a bound from a document or fields */ function zh(t, e, n, s) {
    if (n[0] = I(n[0]), n[0] instanceof Ah) return function(t, e, n, s, i) {
        if (!s) throw new j(Q.NOT_FOUND, `Can't use a DocumentSnapshot that doesn't exist for ${n}().`);
        const r = [];
        // Because people expect to continue/end a query at the exact document
        // provided, we need to use the implicit sort order rather than the explicit
        // sort order, because it's guaranteed to contain the document key. That way
        // the position becomes unambiguous and the query continues/ends exactly at
        // the provided document. Without the key (by using the explicit sort
        // orders), multiple documents could match the position, yielding duplicate
        // results.
                for (const n of Qe(t)) if (n.field.isKeyField()) r.push(Gt(e, s.key)); else {
            const t = s.data.field(n.field);
            if (bt(t)) throw new j(Q.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a document for which the field "' + n.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
            if (null === t) {
                const t = n.field.canonicalString();
                throw new j(Q.INVALID_ARGUMENT, `Invalid query. You are trying to start or end a query using a document for which the field '${t}' (used as the orderBy) does not exist.`);
            }
            r.push(t);
        }
        return new xe(r, i);
    }
    /**
 * Converts a list of field values to a `Bound` for the given query.
 */ (t._query, t.firestore._databaseId, e, n[0]._document, s);
    {
        const i = sh(t.firestore);
        return function(t, e, n, s, i, r) {
            // Use explicit order by's because it has to match the query the user made
            const o = t.explicitOrderBy;
            if (i.length > o.length) throw new j(Q.INVALID_ARGUMENT, `Too many arguments provided to ${s}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);
            const u = [];
            for (let r = 0; r < i.length; r++) {
                const a = i[r];
                if (o[r].field.isKeyField()) {
                    if ("string" != typeof a) throw new j(Q.INVALID_ARGUMENT, `Invalid query. Expected a string for document ID in ${s}(), but got a ${typeof a}`);
                    if (!Ge(t) && -1 !== a.indexOf("/")) throw new j(Q.INVALID_ARGUMENT, `Invalid query. When querying a collection and ordering by documentId(), the value passed to ${s}() must be a plain document ID, but '${a}' contains a slash.`);
                    const n = t.path.child(wt.fromString(a));
                    if (!kt.isDocumentKey(n)) throw new j(Q.INVALID_ARGUMENT, `Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${s}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`);
                    const i = new kt(n);
                    u.push(Gt(e, i));
                } else {
                    const t = dh(n, s, a);
                    u.push(t);
                }
            }
            return new xe(u, r);
        }
        /**
 * Parses the given `documentIdValue` into a `ReferenceValue`, throwing
 * appropriate errors if the value is anything other than a `DocumentReference`
 * or `string`, or if the string is malformed.
 */ (t._query, t.firestore._databaseId, i, e, n, s);
    }
}

function Hh(t, e, n) {
    if ("string" == typeof (n = I(n))) {
        if ("" === n) throw new j(Q.INVALID_ARGUMENT, "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");
        if (!Ge(e) && -1 !== n.indexOf("/")) throw new j(Q.INVALID_ARGUMENT, `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);
        const s = e.path.child(wt.fromString(n));
        if (!kt.isDocumentKey(s)) throw new j(Q.INVALID_ARGUMENT, `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);
        return Gt(t, new kt(s));
    }
    if (n instanceof yc) return Gt(t, n._key);
    throw new j(Q.INVALID_ARGUMENT, `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${fc(n)}.`);
}

/**
 * Validates that the value passed into a disjunctive filter satisfies all
 * array requirements.
 */ function Jh(t, e) {
    if (!Array.isArray(t) || 0 === t.length) throw new j(Q.INVALID_ARGUMENT, `Invalid Query. A non-empty array is required for '${e.toString()}' filters.`);
    if (t.length > 10) throw new j(Q.INVALID_ARGUMENT, `Invalid Query. '${e.toString()}' filters support a maximum of 10 elements in the value array.`);
}

function Yh(t, e, n) {
    if (!n.isEqual(e)) throw new j(Q.INVALID_ARGUMENT, `Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Converts Firestore's internal types to the JavaScript types that we expose
 * to the user.
 *
 * @internal
 */ class Xh {
    convertValue(t, e = "none") {
        switch (Ft(t)) {
          case 0 /* NullValue */ :
            return null;

          case 1 /* BooleanValue */ :
            return t.booleanValue;

          case 2 /* NumberValue */ :
            return Rt(t.integerValue || t.doubleValue);

          case 3 /* TimestampValue */ :
            return this.convertTimestamp(t.timestampValue);

          case 4 /* ServerTimestampValue */ :
            return this.convertServerTimestamp(t, e);

          case 5 /* StringValue */ :
            return t.stringValue;

          case 6 /* BlobValue */ :
            return this.convertBytes(Pt(t.bytesValue));

          case 7 /* RefValue */ :
            return this.convertReference(t.referenceValue);

          case 8 /* GeoPointValue */ :
            return this.convertGeoPoint(t.geoPointValue);

          case 9 /* ArrayValue */ :
            return this.convertArray(t.arrayValue, e);

          case 10 /* ObjectValue */ :
            return this.convertObject(t.mapValue, e);

          default:
            throw U();
        }
    }
    convertObject(t, e) {
        const n = {};
        return ft(t.fields, ((t, s) => {
            n[t] = this.convertValue(s, e);
        })), n;
    }
    convertGeoPoint(t) {
        return new Jc(Rt(t.latitude), Rt(t.longitude));
    }
    convertArray(t, e) {
        return (t.values || []).map((t => this.convertValue(t, e)));
    }
    convertServerTimestamp(t, e) {
        switch (e) {
          case "previous":
            const n = Vt(t);
            return null == n ? null : this.convertValue(n, e);

          case "estimate":
            return this.convertTimestamp(vt(t));

          default:
            return null;
        }
    }
    convertTimestamp(t) {
        const e = At(t);
        return new ct(e.seconds, e.nanos);
    }
    convertDocumentKey(t, e) {
        const n = wt.fromString(t);
        q(js(n));
        const s = new Dt(n.get(1), n.get(3)), i = new kt(n.popFirst(5));
        return s.isEqual(e) || 
        // TODO(b/64130202): Somehow support foreign references.
        $(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`), 
        i;
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Converts custom model object of type T into `DocumentData` by applying the
 * converter if it exists.
 *
 * This function is used when converting user objects to `DocumentData`
 * because we want to provide the user with a more specific error message if
 * their `set()` or fails due to invalid data originating from a `toFirestore()`
 * call.
 */ function Zh(t, e, n) {
    let s;
    // Cast to `any` in order to satisfy the union type constraint on
    // toFirestore().
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return s = t ? n && (n.merge || n.mergeFields) ? t.toFirestore(e, n) : t.toFirestore(e) : e, 
    s;
}

class tl extends Xh {
    constructor(t) {
        super(), this.firestore = t;
    }
    convertBytes(t) {
        return new zc(t);
    }
    convertReference(t) {
        const e = this.convertDocumentKey(t, this.firestore._databaseId);
        return new yc(this.firestore, /* converter= */ null, e);
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A write batch, used to perform multiple writes as a single atomic unit.
 *
 * A `WriteBatch` object can be acquired by calling {@link writeBatch}. It
 * provides methods for adding writes to the write batch. None of the writes
 * will be committed (or visible locally) until {@link WriteBatch.commit} is
 * called.
 */ class el {
    /** @hideconstructor */
    constructor(t, e) {
        this._firestore = t, this._commitHandler = e, this._mutations = [], this._committed = !1, 
        this._dataReader = sh(t);
    }
    set(t, e, n) {
        this._verifyNotCommitted();
        const s = nl(t, this._firestore), i = Zh(s.converter, e, n), r = ih(this._dataReader, "WriteBatch.set", s._key, i, null !== s.converter, n);
        return this._mutations.push(r.toMutation(s._key, In.none())), this;
    }
    update(t, e, n, ...s) {
        this._verifyNotCommitted();
        const i = nl(t, this._firestore);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                let r;
        return r = "string" == typeof (e = I(e)) || e instanceof jc ? fh(this._dataReader, "WriteBatch.update", i._key, e, n, s) : lh(this._dataReader, "WriteBatch.update", i._key, e), 
        this._mutations.push(r.toMutation(i._key, In.exists(!0))), this;
    }
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `WriteBatch` instance. Used for chaining method calls.
     */    delete(t) {
        this._verifyNotCommitted();
        const e = nl(t, this._firestore);
        return this._mutations = this._mutations.concat(new Nn(e._key, In.none())), this;
    }
    /**
     * Commits all of the writes in this write batch as a single atomic unit.
     *
     * The result of these writes will only be reflected in document reads that
     * occur after the returned promise resolves. If the client is offline, the
     * write fails. If you would like to see local modifications or buffer writes
     * until the client is online, use the full Firestore SDK.
     *
     * @returns A `Promise` resolved once all of the writes in the batch have been
     * successfully written to the backend as an atomic unit (note that it won't
     * resolve while you're offline).
     */    commit() {
        return this._verifyNotCommitted(), this._committed = !0, this._mutations.length > 0 ? this._commitHandler(this._mutations) : Promise.resolve();
    }
    _verifyNotCommitted() {
        if (this._committed) throw new j(Q.FAILED_PRECONDITION, "A write batch can no longer be used after commit() has been called.");
    }
}

function nl(t, e) {
    if ((t = I(t)).firestore !== e) throw new j(Q.INVALID_ARGUMENT, "Provided document reference is from a different Firestore instance.");
    return t;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// TODO(mrschmidt) Consider using `BaseTransaction` as the base class in the
// legacy SDK.
/**
 * A reference to a transaction.
 *
 * The `Transaction` object passed to a transaction's `updateFunction` provides
 * the methods to read and write data within the transaction context. See
 * {@link runTransaction}.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Reads the document referred to by this `DocumentReference`.
 *
 * Note: `getDoc()` attempts to provide up-to-date data when possible by waiting
 * for data from the server, but it may return cached data or fail if you are
 * offline and the server cannot be reached. To specify this behavior, invoke
 * {@link getDocFromCache} or {@link getDocFromServer}.
 *
 * @param reference - The reference of the document to fetch.
 * @returns A Promise resolved with a `DocumentSnapshot` containing the
 * current document contents.
 */
function sl(t) {
    t = dc(t, yc);
    const e = dc(t.firestore, Dc);
    return tc(Nc(e), t._key).then((n => gl(e, t, n)));
}

class il extends Xh {
    constructor(t) {
        super(), this.firestore = t;
    }
    convertBytes(t) {
        return new zc(t);
    }
    convertReference(t) {
        const e = this.convertDocumentKey(t, this.firestore._databaseId);
        return new yc(this.firestore, /* converter= */ null, e);
    }
}

/**
 * Reads the document referred to by this `DocumentReference` from cache.
 * Returns an error if the document is not currently cached.
 *
 * @returns A `Promise` resolved with a `DocumentSnapshot` containing the
 * current document contents.
 */ function rl(t) {
    t = dc(t, yc);
    const e = dc(t.firestore, Dc), n = Nc(e), s = new il(e);
    return Za(n, t._key).then((n => new Vh(e, s, t._key, n, new bh(null !== n && n.hasLocalMutations, 
    /* fromCache= */ !0), t.converter)));
}

/**
 * Reads the document referred to by this `DocumentReference` from the server.
 * Returns an error if the network is not available.
 *
 * @returns A `Promise` resolved with a `DocumentSnapshot` containing the
 * current document contents.
 */ function ol(t) {
    t = dc(t, yc);
    const e = dc(t.firestore, Dc);
    return tc(Nc(e), t._key, {
        source: "server"
    }).then((n => gl(e, t, n)));
}

/**
 * Executes the query and returns the results as a `QuerySnapshot`.
 *
 * Note: `getDocs()` attempts to provide up-to-date data when possible by
 * waiting for data from the server, but it may return cached data or fail if
 * you are offline and the server cannot be reached. To specify this behavior,
 * invoke {@link getDocsFromCache} or {@link getDocsFromServer}.
 *
 * @returns A `Promise` that will be resolved with the results of the query.
 */ function ul(t) {
    t = dc(t, pc);
    const e = dc(t.firestore, Dc), n = Nc(e), s = new il(e);
    return xh(t._query), nc(n, t._query).then((n => new Sh(e, s, t, n)));
}

/**
 * Executes the query and returns the results as a `QuerySnapshot` from cache.
 * Returns an error if the document is not currently cached.
 *
 * @returns A `Promise` that will be resolved with the results of the query.
 */ function al(t) {
    t = dc(t, pc);
    const e = dc(t.firestore, Dc), n = Nc(e), s = new il(e);
    return ec(n, t._query).then((n => new Sh(e, s, t, n)));
}

/**
 * Executes the query and returns the results as a `QuerySnapshot` from the
 * server. Returns an error if the network is not available.
 *
 * @returns A `Promise` that will be resolved with the results of the query.
 */ function cl(t) {
    t = dc(t, pc);
    const e = dc(t.firestore, Dc), n = Nc(e), s = new il(e);
    return nc(n, t._query, {
        source: "server"
    }).then((n => new Sh(e, s, t, n)));
}

function hl(t, e, n) {
    t = dc(t, yc);
    const s = dc(t.firestore, Dc), i = Zh(t.converter, e, n);
    return ml(s, [ ih(sh(s), "setDoc", t._key, i, null !== t.converter, n).toMutation(t._key, In.none()) ]);
}

function ll(t, e, n, ...s) {
    t = dc(t, yc);
    const i = dc(t.firestore, Dc), r = sh(i);
    let o;
    o = "string" == typeof (
    // For Compat types, we have to "extract" the underlying types before
    // performing validation.
    e = I(e)) || e instanceof jc ? fh(r, "updateDoc", t._key, e, n, s) : lh(r, "updateDoc", t._key, e);
    return ml(i, [ o.toMutation(t._key, In.exists(!0)) ]);
}

/**
 * Deletes the document referred to by the specified `DocumentReference`.
 *
 * @param reference - A reference to the document to delete.
 * @returns A Promise resolved once the document has been successfully
 * deleted from the backend (note that it won't resolve while you're offline).
 */ function fl(t) {
    return ml(dc(t.firestore, Dc), [ new Nn(t._key, In.none()) ]);
}

/**
 * Add a new document to specified `CollectionReference` with the given data,
 * assigning it a document ID automatically.
 *
 * @param reference - A reference to the collection to add this document to.
 * @param data - An Object containing the data for the new document.
 * @returns A `Promise` resolved with a `DocumentReference` pointing to the
 * newly created document after it has been written to the backend (Note that it
 * won't resolve while you're offline).
 */ function dl(t, e) {
    const n = dc(t.firestore, Dc), s = Ac(t), i = Zh(t.converter, e);
    return ml(n, [ ih(sh(t.firestore), "addDoc", s._key, i, null !== t.converter, {}).toMutation(s._key, In.exists(!1)) ]).then((() => s));
}

function _l(t, ...e) {
    var n, s, i;
    t = I(t);
    let r = {
        includeMetadataChanges: !1
    }, o = 0;
    "object" != typeof e[o] || Vc(e[o]) || (r = e[o], o++);
    const u = {
        includeMetadataChanges: r.includeMetadataChanges
    };
    if (Vc(e[o])) {
        const t = e[o];
        e[o] = null === (n = t.next) || void 0 === n ? void 0 : n.bind(t), e[o + 1] = null === (s = t.error) || void 0 === s ? void 0 : s.bind(t), 
        e[o + 2] = null === (i = t.complete) || void 0 === i ? void 0 : i.bind(t);
    }
    let a, c, h;
    if (t instanceof yc) c = dc(t.firestore, Dc), h = Be(t._key.path), a = {
        next: n => {
            e[o] && e[o](gl(c, t, n));
        },
        error: e[o + 1],
        complete: e[o + 2]
    }; else {
        const n = dc(t, pc);
        c = dc(n.firestore, Dc), h = n._query;
        const s = new il(c);
        a = {
            next: t => {
                e[o] && e[o](new Sh(c, s, n, t));
            },
            error: e[o + 1],
            complete: e[o + 2]
        }, xh(t._query);
    }
    return function(t, e, n, s) {
        const i = new Fa(s), r = new Ku(e, i, n);
        return t.asyncQueue.enqueueAndForget((async () => $u(await Ja(t), r))), () => {
            i.Ia(), t.asyncQueue.enqueueAndForget((async () => Bu(await Ja(t), r)));
        };
    }(Nc(c), h, u, a);
}

function wl(t, e) {
    return sc(Nc(t = dc(t, Dc)), Vc(e) ? e : {
        next: e
    });
}

/**
 * Locally writes `mutations` on the async queue.
 * @internal
 */ function ml(t, e) {
    return function(t, e) {
        const n = new W;
        return t.asyncQueue.enqueueAndForget((async () => sa(await Ha(t), e, n))), n.promise;
    }(Nc(t), e);
}

/**
 * Converts a {@link ViewSnapshot} that contains the single document specified by `ref`
 * to a {@link DocumentSnapshot}.
 */ function gl(t, e, n) {
    const s = n.docs.get(e._key), i = new il(t);
    return new Vh(t, i, e._key, s, new bh(n.hasPendingWrites, n.fromCache), e.converter);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A reference to a transaction.
 *
 * The `Transaction` object passed to a transaction's `updateFunction` provides
 * the methods to read and write data within the transaction context. See
 * {@link runTransaction}.
 */ class yl extends class {
    /** @hideconstructor */
    constructor(t, e) {
        this._firestore = t, this._transaction = e, this._dataReader = sh(t);
    }
    /**
     * Reads the document referenced by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be read.
     * @returns A `DocumentSnapshot` with the read data.
     */    get(t) {
        const e = nl(t, this._firestore), n = new tl(this._firestore);
        return this._transaction.lookup([ e._key ]).then((t => {
            if (!t || 1 !== t.length) return U();
            const s = t[0];
            if (s.isFoundDocument()) return new Ah(this._firestore, n, s.key, s, e.converter);
            if (s.isNoDocument()) return new Ah(this._firestore, n, e._key, null, e.converter);
            throw U();
        }));
    }
    set(t, e, n) {
        const s = nl(t, this._firestore), i = Zh(s.converter, e, n), r = ih(this._dataReader, "Transaction.set", s._key, i, null !== s.converter, n);
        return this._transaction.set(s._key, r), this;
    }
    update(t, e, n, ...s) {
        const i = nl(t, this._firestore);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                let r;
        return r = "string" == typeof (e = I(e)) || e instanceof jc ? fh(this._dataReader, "Transaction.update", i._key, e, n, s) : lh(this._dataReader, "Transaction.update", i._key, e), 
        this._transaction.update(i._key, r), this;
    }
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `Transaction` instance. Used for chaining method calls.
     */    delete(t) {
        const e = nl(t, this._firestore);
        return this._transaction.delete(e._key), this;
    }
} {
    // This class implements the same logic as the Transaction API in the Lite SDK
    // but is subclassed in order to return its own DocumentSnapshot types.
    /** @hideconstructor */
    constructor(t, e) {
        super(t, e), this._firestore = t;
    }
    /**
     * Reads the document referenced by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be read.
     * @returns A `DocumentSnapshot` with the read data.
     */    get(t) {
        const e = nl(t, this._firestore), n = new il(this._firestore);
        return super.get(t).then((t => new Vh(this._firestore, n, e._key, t._document, new bh(
        /* hasPendingWrites= */ !1, 
        /* fromCache= */ !1), e.converter)));
    }
}

/**
 * Executes the given `updateFunction` and then attempts to commit the changes
 * applied within the transaction. If any document read within the transaction
 * has changed, Cloud Firestore retries the `updateFunction`. If it fails to
 * commit after 5 attempts, the transaction fails.
 *
 * The maximum number of writes allowed in a single transaction is 500.
 *
 * @param firestore - A reference to the Firestore database to run this
 * transaction against.
 * @param updateFunction - The function to execute within the transaction
 * context.
 * @returns If the transaction completed successfully or was explicitly aborted
 * (the `updateFunction` returned a failed promise), the promise returned by the
 * `updateFunction `is returned here. Otherwise, if the transaction failed, a
 * rejected promise with the corresponding failure error is returned.
 */ function pl(t, e) {
    return ic(Nc(t = dc(t, Dc)), (n => e(new yl(t, n))));
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns a sentinel for use with {@link @firebase/firestore/lite#(updateDoc:1)} or
 * {@link @firebase/firestore/lite#(setDoc:1)} with `{merge: true}` to mark a field for deletion.
 */ function Il() {
    return new rh("deleteField");
}

/**
 * Returns a sentinel used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link @firebase/firestore/lite#(updateDoc:1)} to
 * include a server-generated timestamp in the written data.
 */ function Tl() {
    return new uh("serverTimestamp");
}

/**
 * Returns a special value that can be used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link
 * @firebase/firestore/lite#(updateDoc:1)} that tells the server to union the given elements with any array
 * value that already exists on the server. Each specified element that doesn't
 * already exist in the array will be added to the end. If the field being
 * modified is not already an array it will be overwritten with an array
 * containing exactly the specified elements.
 *
 * @param elements - The elements to union into the array.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`.
 */ function El(...t) {
    // NOTE: We don't actually parse the data until it's used in set() or
    // update() since we'd need the Firestore instance to do this.
    return new ah("arrayUnion", t);
}

/**
 * Returns a special value that can be used with {@link (setDoc:1)} or {@link
 * updateDoc:1} that tells the server to remove the given elements from any
 * array value that already exists on the server. All instances of each element
 * specified will be removed from the array. If the field being modified is not
 * already an array it will be overwritten with an empty array.
 *
 * @param elements - The elements to remove from the array.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`
 */ function Al(...t) {
    // NOTE: We don't actually parse the data until it's used in set() or
    // update() since we'd need the Firestore instance to do this.
    return new ch("arrayRemove", t);
}

/**
 * Returns a special value that can be used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link
 * @firebase/firestore/lite#(updateDoc:1)} that tells the server to increment the field's current value by
 * the given value.
 *
 * If either the operand or the current field value uses floating point
 * precision, all arithmetic follows IEEE 754 semantics. If both values are
 * integers, values outside of JavaScript's safe number range
 * (`Number.MIN_SAFE_INTEGER` to `Number.MAX_SAFE_INTEGER`) are also subject to
 * precision loss. Furthermore, once processed by the Firestore backend, all
 * integer operations are capped between -2^63 and 2^63-1.
 *
 * If the current field value is not of type `number`, or if the field does not
 * yet exist, the transformation sets the field to the given value.
 *
 * @param n - The value to increment by.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`
 */ function Rl(t) {
    return new hh("increment", t);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Creates a write batch, used for performing multiple writes as a single
 * atomic operation. The maximum number of writes allowed in a single {@link WriteBatch}
 * is 500.
 *
 * Unlike transactions, write batches are persisted offline and therefore are
 * preferable when you don't need to condition your writes on read data.
 *
 * @returns A {@link WriteBatch} that can be used to atomically execute multiple
 * writes.
 */ function Pl(t) {
    return Nc(t = dc(t, Dc)), new el(t, (e => ml(t, e)));
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function bl(t, e) {
    Nc(t = dc(t, Dc));
    const n = "string" == typeof e ? function(t) {
        try {
            return JSON.parse(t);
        } catch (t) {
            throw new j(Q.INVALID_ARGUMENT, "Failed to parse JSON:" + t.message);
        }
    }(e) : e, s = [];
    // PORTING NOTE: We don't return an error if the user has not enabled
    // persistence since `enableIndexeddbPersistence()` can fail on the Web.
    if (Array.isArray(n.indexes)) for (const t of n.indexes) {
        const e = Vl(t, "collectionGroup"), n = [];
        if (Array.isArray(t.fields)) for (const e of t.fields) {
            const t = Ih("setIndexConfiguration", Vl(e, "fieldPath"));
            "CONTAINS" === e.arrayConfig ? n.push(new ae(t, 2 /* CONTAINS */)) : "ASCENDING" === e.order ? n.push(new ae(t, 0 /* ASCENDING */)) : "DESCENDING" === e.order && n.push(new ae(t, 1 /* DESCENDING */));
        }
        s.push(new re(re.UNKNOWN_ID, e, n, ce.empty()));
    }
    // TODO(indexing): Configure indexes
        return Promise.resolve();
}

function Vl(t, e) {
    if ("string" != typeof t[e]) throw new j(Q.INVALID_ARGUMENT, "Missing string value for: " + e);
    return t[e];
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ !function(t, e = !0) {
    !function(t) {
        N = t;
    }(i), n(new r("firestore", ((t, {options: n}) => {
        const s = t.getProvider("app").getImmediate(), i = new Dc(s, new Y(t.getProvider("auth-internal")), new et(t.getProvider("app-check-internal")));
        return n = Object.assign({
            useFetchStreams: e
        }, n), i._setSettings(n), i;
    }), "PUBLIC")), s(C, "3.4.8", t), 
    // BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation
    s(C, "3.4.8", "esm2017");
}("rn", /* useFetchStreams= */ !1);

export { Xh as AbstractUserDataWriter, zc as Bytes, Sc as CACHE_SIZE_UNLIMITED, Ic as CollectionReference, yc as DocumentReference, Vh as DocumentSnapshot, jc as FieldPath, Hc as FieldValue, Dc as Firestore, j as FirestoreError, Jc as GeoPoint, vc as LoadBundleTask, pc as Query, Nh as QueryConstraint, vh as QueryDocumentSnapshot, Sh as QuerySnapshot, bh as SnapshotMetadata, ct as Timestamp, yl as Transaction, el as WriteBatch, Dt as _DatabaseId, kt as _DocumentKey, nt as _EmptyAppCheckTokenProvider, H as _EmptyAuthCredentialsProvider, gt as _FieldPath, dc as _cast, K as _debugAssert, It as _isBase64Available, B as _logWarn, bl as _setIndexConfiguration, cc as _validateIsNotUsedTogether, dl as addDoc, Al as arrayRemove, El as arrayUnion, $c as clearIndexedDbPersistence, Tc as collection, Ec as collectionGroup, gc as connectFirestoreEmulator, fl as deleteDoc, Il as deleteField, Uc as disableNetwork, Ac as doc, Wc as documentId, Mc as enableIndexedDbPersistence, Oc as enableMultiTabIndexedDbPersistence, Lc as enableNetwork, Wh as endAt, jh as endBefore, Nc as ensureFirestoreConfigured, ml as executeWrite, sl as getDoc, rl as getDocFromCache, ol as getDocFromServer, ul as getDocs, al as getDocsFromCache, cl as getDocsFromServer, xc as getFirestore, Rl as increment, Cc as initializeFirestore, Lh as limit, Uh as limitToLast, Kc as loadBundle, Gc as namedQuery, _l as onSnapshot, wl as onSnapshotsInSync, $h as orderBy, kh as query, Pc as queryEqual, Rc as refEqual, pl as runTransaction, Tl as serverTimestamp, hl as setDoc, O as setLogLevel, Ch as snapshotEqual, Gh as startAfter, Kh as startAt, qc as terminate, ll as updateDoc, Bc as waitForPendingWrites, Oh as where, Pl as writeBatch };
//# sourceMappingURL=index.rn.js.map
