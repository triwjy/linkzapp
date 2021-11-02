require "application_system_test_case"

class LinkappsTest < ApplicationSystemTestCase
  setup do
    @linkapp = linkapps(:one)
  end

  test "visiting the index" do
    visit linkapps_url
    assert_selector "h1", text: "Linkapps"
  end

  test "creating a Linkapp" do
    visit linkapps_url
    click_on "New Linkapp"

    click_on "Create Linkapp"

    assert_text "Linkapp was successfully created"
    click_on "Back"
  end

  test "updating a Linkapp" do
    visit linkapps_url
    click_on "Edit", match: :first

    click_on "Update Linkapp"

    assert_text "Linkapp was successfully updated"
    click_on "Back"
  end

  test "destroying a Linkapp" do
    visit linkapps_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Linkapp was successfully destroyed"
  end
end
