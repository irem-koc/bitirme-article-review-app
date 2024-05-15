package dev.irem.reviewapp.business.abstracts;

import dev.irem.reviewapp.business.requests.UpdateUserEmailAddressRequest;
import dev.irem.reviewapp.business.responses.GetAllUserDataResponse;
import dev.irem.reviewapp.business.responses.UpdateUserEmailAddressResponse;

public interface UserRequestService {
    GetAllUserDataResponse getAllUserData(String bearerToken, String requestId);

    UpdateUserEmailAddressResponse updateUserEmailAddress(String bearerToken,
            UpdateUserEmailAddressRequest updateUserEmailAddressRequest);
}
