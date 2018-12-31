import * as utils from 'utils/utils';

declare let io: any;

export class PluginIntercom {
  static init(apiKey: string, appId: string) {
    io.intercom.android.sdk.Intercom.initialize(utils.ad.getApplicationContext(), apiKey, appId);
  }

  static registerIdentifiedUser(options: {userId?: string|number, email?: string}) {
    if (typeof options.userId === 'number') {
      options.userId = String(options.userId);
    }

    let registration = io.intercom.android.sdk.identity.Registration.create();

    if (options.userId && options.userId.length > 0) {
      registration.withUserId(options.userId);
    }

    if (options.email && options.email.length > 0) {
      registration.withEmail(options.email);
    }

    io.intercom.android.sdk.Intercom.client().registerIdentifiedUser(registration);
  }

  static registerUnidentifiedUser() {
    io.intercom.android.sdk.Intercom.client().registerUnidentifiedUser();
  }

  static reset() {
    io.intercom.android.sdk.Intercom.client().reset();
  }

  static setUserHash(secureHash: string) {
    io.intercom.android.sdk.Intercom.client().setUserHash(secureHash);
  }

  static updateUser(attributes: any) {
    let builder = new io.intercom.android.sdk.UserAttributes.Builder();
    if (attributes.name) {
      builder.withName(attributes.name);
    }
    if (attributes.email) {
      builder.withEmail(attributes.email);
    }
    if (attributes.phone) {
      builder.withPhone(attributes.phone);
    }
    if (attributes.custom_attributes) {
      for (let key in attributes.custom_attributes) {
        const value = attributes.custom_attributes[key];
        if (typeof(value) === 'string') {
          builder.withCustomAttribute(key, value);
        }
      }
    }
    io.intercom.android.sdk.Intercom.client().updateUser(builder.build());
  }

  static logEvent(eventName: string, metaData?: any) {
    if (metaData && metaData.length) {
        io.intercom.android.sdk.Intercom.client().logEvent(eventName, metaData);
    } else {
        io.intercom.android.sdk.Intercom.client().logEvent(eventName);
    }
  }

  static displayMessenger() {
    io.intercom.android.sdk.Intercom.client().displayMessenger();
  }

  static displayMessageComposer() {
    io.intercom.android.sdk.Intercom.client().displayMessageComposer();
  }

  static displayMessageComposerWithInitialMessage(initialMessage: string) {
    io.intercom.android.sdk.Intercom.client().displayMessageComposer(initialMessage);
  }

  static displayConversationsList() {
    io.intercom.android.sdk.Intercom.client().displayConversationsList();
  }

  static unreadConversationCount() {
    return io.intercom.android.sdk.Intercom.client().getUnreadConversationCount();
  }

  static setLauncherVisibility(visible: boolean) {
    io.intercom.android.sdk.Intercom.client().setLauncherVisibility(visible ? io.intercom.android.sdk.Intercom.VISIBLE : io.intercom.android.sdk.Intercom.GONE);
  }

  static setInAppMessageVisibility(visible: boolean) {
    io.intercom.android.sdk.Intercom.client().setInAppMessageVisibility(visible ? io.intercom.android.sdk.Intercom.VISIBLE : io.intercom.android.sdk.Intercom.GONE);
  }

  static hideMessenger() {
    io.intercom.android.sdk.Intercom.client().hideMessenger();
  }

  static enableLogging() {
    io.intercom.android.sdk.Intercom.setLogLevel(io.intercom.android.sdk.Intercom.LogLevel.DEBUG);
  }
}
