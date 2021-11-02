class LinkappSerializer
  include JSONAPI::Serializer
  attributes :name, :hyperlink, :description
end
