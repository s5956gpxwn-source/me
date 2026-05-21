import SwiftUI

@main
struct DateConverterApp: App {

    @StateObject private var settings = AppSettings.shared

    var body: some Scene {
        WindowGroup {
            MainTabView()
                .environmentObject(settings)
                .environment(\.layoutDirection, .rightToLeft)
        }
    }
}
