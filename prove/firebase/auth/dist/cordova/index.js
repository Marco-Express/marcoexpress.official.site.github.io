import { getApp, _getProvider } from '@firebase/app';
import { _ as _signInWithRedirect, a as _reauthenticateWithRedirect, b as _linkWithRedirect, r as registerAuth, i as initializeAuth, c as indexedDBLocalPersistence, d as cordovaPopupRedirectResolver } from './popup_redirect-fd81f644.js';
export { A as ActionCodeOperation, a2 as ActionCodeURL, t as AuthCredential, n as AuthErrorCodes, E as EmailAuthCredential, y as EmailAuthProvider, z as FacebookAuthProvider, F as FactorId, B as GithubAuthProvider, G as GoogleAuthProvider, v as OAuthCredential, C as OAuthProvider, O as OperationType, w as PhoneAuthCredential, P as ProviderId, D as SAMLAuthProvider, S as SignInMethod, T as TwitterAuthProvider, Q as applyActionCode, e as browserLocalPersistence, f as browserSessionPersistence, R as checkActionCode, N as confirmPasswordReset, q as connectAuthEmulator, d as cordovaPopupRedirectResolver, V as createUserWithEmailAndPassword, m as debugErrorMap, l as deleteUser, $ as fetchSignInMethodsForEmail, aa as getAdditionalUserInfo, a7 as getIdToken, a8 as getIdTokenResult, ac as getMultiFactorResolver, g as getRedirectResult, x as inMemoryPersistence, c as indexedDBLocalPersistence, i as initializeAuth, Y as isSignInWithEmailLink, J as linkWithCredential, ad as multiFactor, h as onAuthStateChanged, o as onIdTokenChanged, a3 as parseActionCodeURL, p as prodErrorMap, K as reauthenticateWithCredential, ab as reload, a0 as sendEmailVerification, M as sendPasswordResetEmail, X as sendSignInLinkToEmail, s as setPersistence, H as signInAnonymously, I as signInWithCredential, L as signInWithCustomToken, W as signInWithEmailAndPassword, Z as signInWithEmailLink, k as signOut, a9 as unlink, j as updateCurrentUser, a5 as updateEmail, a6 as updatePassword, a4 as updateProfile, u as useDeviceLanguage, a1 as verifyBeforeUpdateEmail, U as verifyPasswordResetCode } from './popup_redirect-fd81f644.js';
import 'tslib';
import '@firebase/util';
import '@firebase/component';
import '@firebase/logger';

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
function signInWithRedirect(auth, provider, resolver) {
    return _signInWithRedirect(auth, provider, resolver);
}
function reauthenticateWithRedirect(user, provider, resolver) {
    return _reauthenticateWithRedirect(user, provider, resolver);
}
function linkWithRedirect(user, provider, resolver) {
    return _linkWithRedirect(user, provider, resolver);
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
function getAuth(app) {
    if (app === void 0) { app = getApp(); }
    var provider = _getProvider(app, 'auth');
    if (provider.isInitialized()) {
        return provider.getImmediate();
    }
    return initializeAuth(app, {
        persistence: indexedDBLocalPersistence,
        popupRedirectResolver: cordovaPopupRedirectResolver
    });
}
registerAuth("Cordova" /* CORDOVA */);

export { getAuth, linkWithRedirect, reauthenticateWithRedirect, signInWithRedirect };
//# sourceMappingURL=index.js.map
