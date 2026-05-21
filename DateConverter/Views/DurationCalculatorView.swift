import SwiftUI

struct DurationCalculatorView: View {

    @StateObject private var vm = DurationViewModel()
    @EnvironmentObject private var settings: AppSettings

    var body: some View {
        ScrollView {
            VStack(spacing: 18) {

                // ── Calendar Type Toggle ────────────────────────────────
                SectionCard {
                    CalendarToggle(selected: Binding(
                        get: { vm.inputSystem },
                        set: { vm.switchSystem($0, countMode: settings.durationCountMode) }
                    ))
                    .frame(maxWidth: .infinity)
                }

                // ── Start Date ─────────────────────────────────────────
                SectionCard(
                    title: String(localized: "duration.start_label"),
                    icon: "calendar.badge.plus",
                    accent: .appPrimary
                ) {
                    WheelDatePicker(
                        day:    $vm.startDate.day,
                        month:  $vm.startDate.month,
                        year:   $vm.startDate.year,
                        system: vm.inputSystem
                    )
                    .onChange(of: vm.startDate) { vm.calculate(countMode: settings.durationCountMode) }

                    DateDisplayCard(
                        value: vm.startDate,
                        numberStyle: settings.numberStyle,
                        label: String(localized: "duration.start_label")
                    )
                }

                // ── Swap Button ────────────────────────────────────────
                Button {
                    withAnimation(.spring(response: 0.35)) {
                        vm.swapDates(countMode: settings.durationCountMode)
                    }
                } label: {
                    Image(systemName: "arrow.up.arrow.down.circle.fill")
                        .font(.system(size: 30))
                        .foregroundStyle(.appSecondary)
                }
                .buttonStyle(.plain)

                // ── End Date ───────────────────────────────────────────
                SectionCard(
                    title: String(localized: "duration.end_label"),
                    icon: "calendar.badge.minus",
                    accent: .appSecondary
                ) {
                    WheelDatePicker(
                        day:    $vm.endDate.day,
                        month:  $vm.endDate.month,
                        year:   $vm.endDate.year,
                        system: vm.inputSystem
                    )
                    .onChange(of: vm.endDate) { vm.calculate(countMode: settings.durationCountMode) }

                    DateDisplayCard(
                        value: vm.endDate,
                        numberStyle: settings.numberStyle,
                        label: String(localized: "duration.end_label"),
                        accent: .appSecondary
                    )
                }

                // ── Calculate Button ───────────────────────────────────
                Button {
                    withAnimation(.spring(response: 0.4, dampingFraction: 0.7)) {
                        vm.calculate(countMode: settings.durationCountMode)
                    }
                } label: {
                    Text(String(localized: "duration.calculate"))
                        .font(.headline)
                        .foregroundStyle(.white)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 14)
                        .background(
                            RoundedRectangle(cornerRadius: 14, style: .continuous)
                                .fill(Color.appPrimary)
                        )
                }
                .buttonStyle(.plain)

                // ── Result ─────────────────────────────────────────────
                if let result = vm.result {
                    SectionCard(
                        title: String(localized: "duration.result_title"),
                        icon: "timer",
                        accent: .appPrimary
                    ) {
                        Text(result.formatted(numberStyle: settings.numberStyle))
                            .font(.title3.weight(.semibold))
                            .multilineTextAlignment(.center)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 8)
                            .lineSpacing(6)
                    }
                    .transition(.opacity.combined(with: .move(edge: .bottom)))
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 20)
        }
        .background(Color.appBackground.ignoresSafeArea())
        .navigationTitle(String(localized: "tab.duration"))
        .navigationBarTitleDisplayMode(.large)
    }
}
