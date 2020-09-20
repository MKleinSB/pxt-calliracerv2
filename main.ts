bluetooth.onBluetoothConnected(function () {
    basic.showString("C")
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showString("D")
})
control.onEvent(EventBusSource.MES_DPAD_CONTROLLER_ID, EventBusValue.MICROBIT_EVT_ANY, function () {
    if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_1_DOWN) {
        callibot.motor(KMotor.beide, KDir.vorwaerts, 100)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_1_UP) {
        callibot.motorStop(KMotor.beide, KStop.Frei)
    }
    if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_2_DOWN) {
        callibot.motor(KMotor.links, KDir.vorwaerts, 100)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_2_UP) {
        callibot.motorStop(KMotor.links, KStop.Frei)
    }
    if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_3_DOWN) {
        callibot.motor(KMotor.rechts, KDir.vorwaerts, 100)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_3_UP) {
        callibot.motorStop(KMotor.rechts, KStop.Frei)
    }
})
