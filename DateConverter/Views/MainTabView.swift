import SwiftUI

struct MainTabView: View {

    @EnvironmentObject private var settings: AppSettings

    var body: some View {
        TabView {
            NavigationStack {
                ConverterView(defaultSystem: settings.defaultCalendar)
            }
            .tabItem {
                Label(String(localized: "tab.converter"), systemImage: "arrow.left.arrow.right")
            }

            NavigationStack {
                AgeCalculatorView()
            }
            .tabItem {
                Label(String(localized: "tab.age"), systemImage: "person.crop.circle")
            }

            NavigationStack {
                DurationCalculatorView()
            }
            .tabItem {
                Label(String(localized: "tab.duration"), systemImage: "calendar.badge.clock")
            }

            NavigationStack {
                SettingsView()
            }
            .tabItem {
                Label(String(localized: "tab.settings"), systemImage: "gearshape")
            }
        }
        .tint(.appPrimary)
    }
}
