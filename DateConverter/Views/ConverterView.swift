import SwiftUI

struct ConverterView: View {

    @StateObject private var vm: ConverterViewModel
    @EnvironmentObject private var settings: AppSettings

    init(defaultSystem: CalendarSystem) {
        _vm = StateObject(wrappedValue: ConverterViewModel(defaultSystem: defaultSystem))
    }

    var body: some View {
        ScrollView {
            VStack(spacing: 18) {

                // ── Input Card ──────────────────────────────────────────
                SectionCard(
                    title: String(localized: "converter.input_title"),
                    icon: "calendar",
                    accent: .appPrimary
                ) {
                    // Calendar label
                    HStack {
                        Spacer()
                        Label(
                            vm.direction.inputSystem == .hijri
                                ? String(localized: "calendar.hijri")
                                : String(localized: "calendar.gregorian"),
                            systemImage: "calendar"
                        )
                        .font(.caption.weight(.medium))
                        .foregroundStyle(.appPrimary)
                    }

                    WheelDatePicker(
                        day:    $vm.input.day,
                        month:  $vm.input.month,
                        year:   $vm.input.year,
                        system: vm.direction.inputSystem
                    )
                    .onChange(of: vm.input) { vm.convert() }

                    // Today button
                    Button {
                        withAnimation { vm.setToday() }
                    } label: {
                        Label(String(localized: "converter.today"), systemImage: "calendar.badge.clock")
                            .font(.footnote.weight(.medium))
                            .foregroundStyle(.appPrimary)
                    }
                    .buttonStyle(.plain)
                    .frame(maxWidth: .infinity, alignment: .center)
                }

                // ── Flip Button ─────────────────────────────────────────
                Button {
                    withAnimation(.spring(response: 0.4, dampingFraction: 0.7)) {
                        vm.flip()
                    }
                } label: {
                    Image(systemName: "arrow.up.arrow.down.circle.fill")
                        .font(.system(size: 36))
                        .foregroundStyle(.appPrimary)
                        .rotationEffect(.degrees(vm.direction == .hijriToGregorian ? 0 : 180))
                }
                .buttonStyle(.plain)

                // ── Result Card ─────────────────────────────────────────
                SectionCard(
                    title: String(localized: "converter.result_title"),
                    icon: "arrow.triangle.2.circlepath",
                    accent: .appSecondary
                ) {
                    if let result = vm.result {
                        DateDisplayCard(
                            value: result,
                            numberStyle: settings.numberStyle,
                            label: result.system == .hijri
                                ? String(localized: "calendar.hijri")
                                : String(localized: "calendar.gregorian"),
                            accent: .appSecondary
                        )
                        .transition(.opacity.combined(with: .scale(scale: 0.97)))
                    }
                }

                // ── Input display (for confirmation) ───────────────────
                SectionCard {
                    DateDisplayCard(
                        value: vm.input,
                        numberStyle: settings.numberStyle,
                        label: vm.direction.inputSystem == .hijri
                            ? String(localized: "calendar.hijri")
                            : String(localized: "calendar.gregorian")
                    )
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 20)
        }
        .background(Color.appBackground.ignoresSafeArea())
        .navigationTitle(String(localized: "tab.converter"))
        .navigationBarTitleDisplayMode(.large)
    }
}
