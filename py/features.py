# OgliLinkShortener SDK feature factory

from feature.base_feature import OgliLinkShortenerBaseFeature
from feature.test_feature import OgliLinkShortenerTestFeature


def _make_feature(name):
    features = {
        "base": lambda: OgliLinkShortenerBaseFeature(),
        "test": lambda: OgliLinkShortenerTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
