import SwiftUI

final class AppSettings: ObservableObject {

    @AppStorage("defaultCalendar")   var defaultCalendar: CalendarSystem = .gregorian
    @AppStorage("numberStyle")       var numberStyle: NumberStyle         = .arabic
    @AppStorage("durationCountMode") var durationCountMode: DurationCountMode = .both
    @AppStorage("appLanguage")       var appLanguage: String              = "ar"

    static let shared = AppSettings()
    private init() {}
}
